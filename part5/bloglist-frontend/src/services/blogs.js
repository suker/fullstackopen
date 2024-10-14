import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const create = async (data, token) => {
	const headers = {
		'Content-type': 'application/json',
		Authorization: `Bearer ${token}`,
	};

	const response = await axios.post(baseUrl, data, { headers });
	return response.data;
};

const update = async (data) => {
	const response = await axios.put(`${baseUrl}/${data.id}`, data);
	return response.data;
};

const deleteBlog = async (id, token) => {
	const headers = {
		'Content-type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
	await axios.delete(`${baseUrl}/${id}`, { headers });
};

export default { getAll, create, update, deleteBlog };
