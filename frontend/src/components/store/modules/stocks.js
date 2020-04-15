import stocks from '../../../data/stocks';
import axios from 'axios';
const state = {
	stocks: [],
	currentStock: {
		ticker: '',
		price: 0,
		high: 0,
		low: 0,
		change: 0,
		changePercent: '0 %'
	}
	// watchlist: [],
};

const mutations = {
	SET_STOCKS(state, stocks) {
		state.stocks = stocks;
	},
	RND_STOCKS(state) {},
	UPDATE_STOCK(state, curStock) {
		state.currentStock = curStock;
	}
};

const actions = {
	buyStock: ({ commit }, order) => {
		commit('BUY_STOCK', order);
	},

	// Get info from server here
	initStocks: ({ commit }) => {
		commit('SET_STOCKS', stocks);
	},

	randomizeStocks: ({ commit }) => {
		commit('RND_STOCKS');
	},

	addStock: ({ commit }, order) => {
		commit('ADD_STOCK', order);
	},

	updateCurrent: ({ commit }, ticker) => {
		axios
			.post('/quote', {
				ticker: ticker
			})
			.then(res => {
				console.log(res);
				commit('UPDATE_STOCK', res);
			})
			.catch(error => console.log(error));
	}
};

const getters = {
	stocks: state => {
		return state.stocks;
	},
	currentStock: state => {
		return state.currentStock;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
