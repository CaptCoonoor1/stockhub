import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://stock-sim-nid.herokuapp.com'
});

//instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance;
