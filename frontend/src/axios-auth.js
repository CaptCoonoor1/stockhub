import axios from 'axios';

const instance = axios.create({
<<<<<<< HEAD
	//baseURL: 'http://localhost:5000'
	const port = process.env.PORT;
	baseURL: port
=======
	baseURL: 'http://localhost:5000',
>>>>>>> c43ac7df4b78d67079936b250ce35d4e2a3935d0
});

//instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance;
