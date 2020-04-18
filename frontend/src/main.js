// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import axios from 'axios';
import router from './router/index';
import store from './store';
import VueToastify from 'vue-toastify';

Vue.use(VueToastify, {
	position: 'center-right',
});

Vue.filter('currency', (value) => {
	let formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	});
	return formatter.format(value);
});

axios.defaults.baseURL = 'http://localhost:5000';

axios.defaults.headers.get['Accepts'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const reqInterceptor = axios.interceptors.request.use((config) => {
	console.log('Request Interceptor', config);
	return config;
});
const resInterceptor = axios.interceptors.response.use((res) => {
	console.log('Response Interceptor', res);
	return res;
});

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>',
});
