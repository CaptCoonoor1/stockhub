import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? "" : "http://localhost:5000"
});

//instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance;
