import Vue from 'vue';
import Vuex from 'vuex';
import axios from './axios-auth';
import globalAxios from 'axios';
import stocks from './components/store/modules/stocks';
import portfolio from './components/store/modules/portfolio';
import router from './router/index';
import watchlist from './components/store/modules/watchlist';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		idToken: null,
		userId: null,
		user: null,
		userAuthenticated: false,
		emailInUse: false,
	},
	mutations: {
		authUser(state, userData) {
			state.idToken = userData.token;
			state.userId = userData.userId;
		},
		storeUser(state, user) {
			state.user = user;
		},
		clearAuthData(state) {
			state.idToken = null;
			state.userId = null;
		},
	},
	actions: {
		// setLogoutTimer({ commit }, expirationTime) {
		// 	setTimeout(() => {
		// 		commit('clearAuthData');
		// 	}, expirationTime * 1000000);
		// },
		signup({ commit, dispatch }, authData) {
			this.state.emailInUse = false;
			axios
				.post('/register', {
					name: authData.name,
					email: authData.email,
					password: authData.password,
					returnSecureToken: true,
				})
				.then((res) => {
					commit('authUser', {
						token: res.data.token,
						userId: res.data.localId,
					});
					// const now = new Date();
					// const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
					localStorage.setItem('token', res.data.token);

					// Don't need these in localStorage
					// localStorage.setItem('userId', res.data.localId);
					// localStorage.setItem('expirationDate', expirationDate);
					commit('storeUser', authData);
					// dispatch('setLogoutTimer', res.data.expiresIn);
				})
				.catch((error) => (this.state.emailInUse = true));
		},
		login({ commit, dispatch }, authData) {
			axios
				.post('/login', {
					name: authData.name,
					email: authData.email,
					password: authData.password,
					returnSecureToken: true,
				})
				.then((res) => {
					// Uses regex to take out the bearer in the string
					// this.$vToastify.success('Successful Login');
					console.log(res);
					const now = new Date();
					const expirationDate = new Date(now.getTime() + res.data.expiresIn * 10000);
					localStorage.setItem('token', res.data.token.replace(/^Bearer\s/i, ''));
					localStorage.setItem('userId', res.data.localId);
					localStorage.setItem('expirationDate', expirationDate);
					commit('authUser', {
						token: res.data.idToken,
						userId: res.data.localId,
					});
					dispatch('initStocks');
					commit('SET_FUNDS', {
						funds: res.data.cash,
					});
					this.state.userAuthenticated = true;
					// dispatch('setLogoutTimer', res.data.expiresIn);
				})
				.catch((error) => console.log(error));
		},
		tryAutoLogin({ commit }) {
			const token = localStorage.getItem('token');
			if (!token) {
				return;
			}
			const expirationDate = localStorage.getItem('expirationDate');
			const now = new Date();
			if (now >= expirationDate) {
				return;
			}
			const userId = localStorage.getItem('userId');
			commit('authUser', {
				token: token,
				userId: userId,
			});
		},
		logout({ commit }) {
			commit('clearAuthData');
			localStorage.removeItem('expirationDate');
			localStorage.removeItem('token');
			localStorage.removeItem('userId');
			this.state.userAuthenticated = false;
			router.replace('/login');
		},
		storeUser({ commit, state }, userData) {
			if (!state.idToken) {
				return;
			}
			globalAxios
				.post('/users.json' + '?auth=' + state.idToken, userData)
				.then((res) => console.log(res))
				.catch((error) => console.log(error));
		},
		fetchUser({ commit, state }) {
			if (!state.idToken) {
				return;
			}
			globalAxios
				.get('/users.json' + '?auth=' + state.idToken)
				.then((res) => {
					console.log(res);
					const data = res.data;
					const users = [];
					for (let key in data) {
						const user = data[key];
						user.id = key;
						users.push(user);
					}
					console.log(users);
					commit('storeUser', users[0]);
				})
				.catch((error) => console.log(error));
		},
	},
	getters: {
		user(state) {
			return state.user;
		},
		isAuthenticated(state) {
			return state.userAuthenticated;
		},
		emailTaken(state) {
			return state.emailInUse;
		},
	},
	modules: {
		stocks: stocks,
		portfolio: portfolio,
		watchlist: watchlist,
	},
});
