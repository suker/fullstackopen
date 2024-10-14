const { test, expect, beforeEach, describe } = require('@playwright/test');
const {
	onCreateUser,
	onLogin,
	onCreateBlog,
	onLikeBlog,
	onDeleteBlog,
} = require('./helper');
const exp = require('constants');
const { before } = require('node:test');

const USERS_DATA = [
	{
		name: 'Carlos',
		username: 'juan',
		password: 'juan',
	},
	{
		name: 'Pedro',
		username: 'pedro',
		password: 'pedro',
	},
];

describe('Blog App', () => {
	beforeEach(async ({ page, request }) => {
		await request.post('/api/testing/reset');
		onCreateUser(request, USERS_DATA[0]);
		onCreateUser(request, USERS_DATA[1]);
		await page.goto('/');
	});

	test('Login form is shown', async ({ page }) => {
		await expect(
			page.getByText('🔅 Log in to application 🔅')
		).toBeVisible();
		await expect(
			page.getByRole('button', { name: '🔒 Login' })
		).toBeVisible();
	});

	describe('Login', () => {
		test('succeeds with correct credentials', async ({ page }) => {
			onLogin(page, 'juan', 'juan', '🔒 Login');

			await expect(page.getByText('BLOGS 📚')).toBeVisible();
			await expect(page.getByText('🙋 Welcome Carlos!')).toBeVisible();
		});

		test('fails with wrong credentials', async ({ page }) => {
			onLogin(page, 'juan', 'fail!', '🔒 Login');

			await expect(
				page.getByText('invalid username or password')
			).toBeVisible();
		});

		describe('When logged in', () => {
			beforeEach(async ({ page }) => {
				await onLogin(page, 'juan', 'juan', '🔒 Login');
				await onCreateBlog(
					page,
					'Welcome to my world',
					'SKR',
					'https://skr.dev'
				);
			});

			test('a new blog can be created', async ({ page }) => {
				const blogDiv = await page.locator('css=.blog');
				await expect(blogDiv).toContainText(
					'Welcome to my world - author: SKR'
				);
			});

			test('blog can be liked', async ({ page }) => {
				await onLikeBlog(page);
				await expect(page.locator('.likes')).toContainText('likes 1');
			});

			test('blog can be deleted', async ({ page }) => {
				await onDeleteBlog(page);
				await expect(page.locator('.blog')).not.toBeVisible();
			});

			test('user who added the blog, can see delete button', async ({
				page,
			}) => {
				await page.getByRole('button', { name: 'Log out' }).click();
				await onLogin(
					page,
					USERS_DATA[1].username,
					USERS_DATA[1].password,
					'🔒 Login'
				);
				await expect(page.locator('.remove-btn')).not.toBeVisible();
			});

			describe('on multiple blogs created', () => {
				beforeEach(async ({ page }) => {
					await onCreateBlog(
						page,
						'Second blog',
						'SKR #2',
						'https://skr.dev'
					);
					await onCreateBlog(
						page,
						'Third blog',
						'SKR #3',
						'https://skr.dev'
					);
				});
				test('blogs are arranged in order according to number of likes. Most likes first', async ({
					page,
				}) => {
					const numberOfLikes = [5, 6, 3];
					const blogDivs = page.locator('.blog');
					const count = await blogDivs.count();
					for (let index = 0; index < count; index++) {
						const element = blogDivs.nth(index);
						await element.locator('button.visibility-btn').click();
						for (let i = 0; i < numberOfLikes[index]; i++) {
							await element.locator('button.like-btn').click();
						}
					}
					const sortedLikes = [...numberOfLikes].sort(
						(a, b) => b - a
					);
					await expect(page.locator('.likes').first()).toContainText(
						`likes ${sortedLikes[0]}`
					);
					await expect(page.locator('.likes').nth(1)).toContainText(
						`likes ${sortedLikes[1]}`
					);
					await expect(page.locator('.likes').nth(2)).toContainText(
						`likes ${sortedLikes[2]}`
					);
				});
			});
		});
	});
});
