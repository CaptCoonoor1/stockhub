import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import store from '@/store';

import Email from '@/components/email/Email.vue';
import Portfolio from '@/components/portfolio/Portfolio.vue';
import Stocks from '@/components/stocks/Stocks.vue';
import Signup from '@/components/Auth/signup.vue';
import DashboardPage from '@/components/dashboard/dashboard.vue';
import Login from '@/components/Auth/login.vue';
import Watchlist from '../components/watchlist/Watchlist.vue';

Vue.use(Router);
const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},

	{
		path: '/portfolio',
		name: 'Portfolio',
		component: Portfolio,
	},
	{
		path: '/stocks',
		name: 'Stocks',
		component: Stocks,
	},
	{
		path: '/watchlist',
		name: 'Watchlist',
		component: Watchlist,
	},
	{
		path: '/emailverified=true',
		name: 'Email',
		component: Email,
	},
	{
		path: '/signup',
		name: 'Signup',
		component: Signup,
	},
	{
		path: '/login',
		name: 'Login',
		// component: Login,
		component: Login,
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: DashboardPage,
		beforeEnter(to, from, next) {
			if (store.state.idToken) {
				next();
			} else {
				next('/login');
			}
		},
	},
];
export default new Router({ mode: 'history', routes });
