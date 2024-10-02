import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import axios from 'axios';

const App = () => {

	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	const cleanLoginInputs = () => {
		setUsername('');
		setPassword('');
	};

	function compare( a, b ) {
		if ( a.likes > b.likes ){
		  return -1;
		}
		if ( a.likes < b.likes ){
		  return 1;
		}
		return 0;
	  }
	  

	const fetchBlogs = async () => {
		try {
			const blogs = await blogService.getAll();
			blogs.sort( compare )
			setBlogs(blogs);
		} catch (exception) {
			console.log('Error on retrieving blogs from DB');
		}
	};

	const displayMessage = (msg) => {
		setMessage(msg);

		setTimeout(() => {
			setMessage('');
		}, 4000);
	};

	useEffect(() => {
		fetchBlogs();

		if (!user) {
			const storageUser = JSON.parse(
				window.localStorage.getItem('bloglistAuthUser')
			);
			console.log('storageUser', storageUser);
			setUser(storageUser);
		}
	}, []);

	const handleLogin = async (ev) => {
		ev.preventDefault();
		// console.log('handleLogin..');
		if (!username || !password) {
			displayMessage('Insert username and password');
			return;
		}
		try {
			const response = await axios.post('/api/login', {
				username,
				password,
			});
			console.log('user with token:', response.data);
			setUser(response.data);
			window.localStorage.setItem(
				'bloglistAuthUser',
				JSON.stringify(response.data)
			);
		} catch (exception) {
			displayMessage(exception.response.data.error);
		}
		cleanLoginInputs();
	};

	const handleLogout = () => {
		console.log('handling logging out...');
		setUser(null);
		window.localStorage.removeItem('bloglistAuthUser');
	};

	const addBlog = async (blogObject) => {
		try {
			const newBlog = await blogService.create(blogObject, user.token);
			console.log('newBlog after creation:', newBlog);
			setBlogs([...blogs, newBlog]);
			displayMessage(`a new blog "${newBlog.title}" has been added!`);
		} catch (exception) {
			displayMessage(exception.response.data.error);
		}
	};

	const loginForm = () => {
		return (
			<form onSubmit={handleLogin}>
				<span>Username</span>
				<input
					type="text"
					placeholder="username"
					value={username}
					onChange={(ev) => {
						setUsername(ev.target.value);
					}}
				/>
				<br />
				<span>Password</span>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(ev) => {
						setPassword(ev.target.value);
					}}
				/>
				<br />
				<button type="submit">Logearse!</button>
			</form>
		);
	};

	if (user === null) {
		return (
			<div>
				<h1>🔅 Log in to application 🔅</h1>
				{message && (
					<Notification
						msg={message}
						error="true"
					/>
				)}
				{loginForm()}
			</div>
		);
	}

	return (
		<div>
			<h2>BLOGS 📚 </h2>
			{message && <Notification msg={message} />}
			<div className="welcome-user">
				<h3>
					🙋 Welcome {user.name}!
					<button onClick={handleLogout}>Log out</button>
				</h3>
			</div>
			<Togglable
				buttonLabel="Create a new blog"
				style={{ marginBottom: 30 }}
			>
				<section className="new-blogs">
					<BlogForm addBlog={addBlog} />
				</section>
			</Togglable>
			<h3>Blogs list</h3>
			<ul style={{ listStyle: 'none', padding: 0 }}>
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						blogs={blogs}
						setBlogs={setBlogs}
						user={user}
						setMessage={setMessage}
					/>
				))}
			</ul>
		</div>
	);
};

export default App;