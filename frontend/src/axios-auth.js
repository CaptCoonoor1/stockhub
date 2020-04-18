import axios from 'axios';

const instance = axios.create({
	//baseURL: 'http://localhost:5000'
	const port = process.env.PORT;
	baseURL: port
});

//instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance;
