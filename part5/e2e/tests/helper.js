const onCreateUser = async (request, data) => {
	await request.post('/api/users', {
		data,
	});
};

const onLogin = async (page, username, password, btnName) => {
	await page.getByPlaceholder('username').fill(username);
	await page.getByPlaceholder('password').fill(password);
	await page.getByRole('button', { name: btnName }).click();
};

const onCreateBlog = async (page, title, author, url) => {
	await page.getByRole('button', { name: 'Create a new blog' }).click();
	await page.getByTestId('title').fill(title);
	await page.getByTestId('author').fill(author);
	await page.getByTestId('url').fill(url);
	await page.getByTestId('create-blog').click();
	await page.locator('.bloglist').getByText(title).waitFor();
};

const onLikeBlog = async (page) => {
	await page.locator('.visibility-btn').click();
	await page.locator('.like-btn').click();
};

const onDeleteBlog = async (page) => {
	await page.locator('.visibility-btn').click();
	await page.on('dialog', (dialog) => dialog.accept());
	await page.locator('.remove-btn').click();
};

export { onCreateUser, onLogin, onCreateBlog, onLikeBlog, onDeleteBlog };
