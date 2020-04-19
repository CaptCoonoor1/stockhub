import axios from 'axios';

// Creatse the axios instance setting the base url
// If not in production, localhost is used
const instance = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? "" : "http://localhost:5000"
});

//instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance;
