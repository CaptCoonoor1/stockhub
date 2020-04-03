import stocks from '../../../data/stocks';

const state = {
	stocks: [],
	watchlist: [],
};

const mutations = {
	SET_STOCKS(state, stocks) {
		state.stocks = stocks;
	},
	RND_STOCKS(state) {},
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
};

const getters = {
	stocks: state => {
		return state.stocks;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
