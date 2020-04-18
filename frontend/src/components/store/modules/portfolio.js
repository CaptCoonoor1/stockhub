import axios from '../../../axios-auth';
import globalAxios from 'axios';

const state = {
	funds: 10000,
	stocks: [],
	watchlist: [],
};

const mutations = {
	SET_FUNDS(state, { funds }) {
		state.funds = funds;
	},
	SET_STOCKS(state, stocks) {
		let newStocksArray = [];
		axios
			.post('/portfolio/get', {
				token: localStorage.token,
				returnSecureToken: true,
			})
			.then((res) => {
				console.log(res);
				res.data.map((el) => {
					newStocksArray.push({
						ticker: el.Ticker,
						quantity: el.Quantity,
						price: el.AvgPrice.toFixed(2),
					});
				});
				console.log(newStocksArray);
			})
			.catch((error) => console.log(error));
		state.stocks = newStocksArray;
		let newWatchlistArray = [];
		axios
			.post('/watchlist/get', {
				token: localStorage.token,
				returnSecureToken: true,
			})
			.then((res) => {
				console.log(res);
				res.data.map((el) => {
					newWatchlistArray.push({
						ticker: el.Ticker,
						price: el.Price.toFixed(2),
					});
				});
				console.log(newWatchlistArray);
			})
			.catch((error) => console.log(error));
		state.watchlist = newWatchlistArray;
	},
	BUY_STOCK(state, { ticker, price, high, low, change, changePercent, quantity }) {
		const record = state.stocks.find((element) => element.ticker == ticker);
		if (record) {
			record.quantity += parseInt(quantity);
		} else {
			state.stocks.push({
				ticker,
				price,
				high,
				low,
				change,
				changePercent,
				quantity: parseInt(quantity),
			});
		}
		state.funds -= price * quantity;
		axios
			.post('/stock/buy_market', {
				token: localStorage.token,
				ticker: ticker,
				quantity: quantity,
				returnSecureToken: true,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((error) => console.log(error));
	},
	SELL_STOCK(state, { ticker, price, quantity }) {
		const record = state.stocks.find((element) => element.ticker == ticker);
		if (record.quantity > quantity) {
			record.quantity -= quantity;
		} else {
			state.stocks.splice(state.stocks.indexOf(record), 1);
		}
		state.funds += price * quantity;
		axios
			.post('/stock/sell_market', {
				token: localStorage.token,
				ticker: ticker,
				quantity: quantity,
				returnSecureToken: true,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((error) => console.log(error));
	},

	ADD_STOCK(state, { ticker, price }) {
		const record = state.watchlist.find((element) => element.ticker == ticker);
		console.log('TICKER: ' + ticker);
		console.log('Price; ' + price);
		console.log(record);
		if (record) {
			alert('Already added!');
		} else {
			state.watchlist.push({
				ticker: ticker,
				price: price,
			});
		}
		axios
			.post('/watchlist/add', {
				token: localStorage.token,
				ticker: ticker,
				returnSecureToken: true,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((error) => console.log(error));
	},
	REMOVE_FROM_WATCHLIST(state, { ticker }) {
		const record = state.watchlist.find((element) => element.ticker == ticker);
		const index = state.watchlist.indexOf(record);
		state.watchlist.splice(index, 1);
		axios
			.post('/watchlist/delete', {
				token: localStorage.token,
				ticker: ticker,
				returnSecureToken: true,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((error) => console.log(error));
		console.log(state.watchlist);
	},
};

const actions = {
	sellStock({ commit }, order) {
		commit('SELL_STOCK', order);
	},
	remove({ commit }, stock) {
		commit('REMOVE_FROM_WATCHLIST', stock);
	},
	updateCurrent({ commit }, ticker) {
		console.log(ticker);
		axios
			.post('/quote', {
				ticker: ticker,
				returnSecureToken: true,
			})
			.then((res) => {
				const stockInfo = res.data['Global Quote'];
				console.log(stockInfo['01. symbol']);
				commit('UPDATE_STOCK', stockInfo);
			})
			.catch((error) => console.log(error));
	},
};

const getters = {
	stockPortfolio(state, getters) {
		console.log(state.stocks);
		return state.stocks.map((stock) => {
			const record = state.stocks.find((element) => element.ticker == stock.ticker);
			return {
				ticker: stock.ticker,
				price: stock.price,
				high: stock.high,
				low: stock.low,
				change: stock.change,
				changePercent: stock.price,
				quantity: stock.quantity,
			};
		});
	},
	stocks(state) {
		return state.stocks;
	},
	getWatchlist(state, getters) {
		console.log(state.watchlist);
		return state.watchlist.map((s) => {
			const record = state.watchlist.find((element) => element.ticker == s.ticker);
			if (record) {
				return {
					ticker: s.ticker,
					price: s.price,
				};
			} else return;
		});
	},
	funds(state) {
		return state.funds.toFixed(2);
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
