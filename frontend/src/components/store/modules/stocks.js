import stocks from '../../../data/stocks';
import axios from 'axios';
const state = {
	// stocks: [],
	currentStock: {
		ticker: '',
		price: 0,
		high: 0,
		low: 0,
		change: 0,
		changePercent: '0 %',
	},
	// watchlist: [],
};

const mutations = {
	RND_STOCKS(state) {},
	UPDATE_STOCK(state, curStock) {
		console.log(curStock);
		state.currentStock.ticker = curStock['01. symbol'];
		state.currentStock.price = curStock['05. price'].substring(0, curStock['05. price'].length - 2);
		state.currentStock.high = curStock['03. high'].substring(0, curStock['03. high'].length - 2);
		state.currentStock.low = curStock['04. low'].substring(0, curStock['04. low'].length - 2);
		state.currentStock.change = curStock['09. change'].substring(
			0,
			curStock['09. change'].length - 2,
		);
		state.currentStock.changePercent = curStock['10. change percent'];
	},
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

	// updateCurrent: ({ commit }, ticker) => {
	// 	console.log(ticker);
	// 	axios
	// 		.post('/quote', {
	// 			ticker: ticker,
	// 			returnSecureToken: true,
	// 		})
	// 		.then((res) => {
	// 			const stockInfo = res.data['Global Quote'];
	// 			console.log(stockInfo['01. symbol']);
	// 			commit('UPDATE_STOCK', stockInfo);
	// 		})
	// 		.catch((error) => console.log(error));
	// },
};

const getters = {
	// stocks: (state) => {
	// 	return state.stocks;
	// },
	currentStock: (state) => {
		return state.currentStock;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
