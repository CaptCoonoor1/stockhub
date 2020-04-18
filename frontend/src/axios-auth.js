import axios from 'axios';

const port = process.env.PORT;

const instance = axios.create({
	baseURL: 'http://localhost:5000'
});

//instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance;
