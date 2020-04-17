const state = {
	funds: 10000,
	stocks: [],
	watchlist: [],
};

const mutations = {
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
	},
	SELL_STOCK(state, { ticker, price, quantity }) {
		const record = state.stocks.find((element) => element.ticker == ticker);
		if (record.quantity > quantity) {
			record.quantity -= quantity;
		} else {
			state.stocks.splice(state.stocks.indexOf(record), 1);
		}
		state.funds += price * quantity;
	},
	ADD_STOCK(state, { stockId, quantity, stockPrice }) {
		const record = state.watchlist.find((element) => element.id == stockId);

		if (record) {
			alert('Already added!');
		} else {
			state.watchlist.push({
				id: stockId,
				stockPrice: stockPrice,
				quantity: quantity,
			});
		}
	},
	REMOVE_FROM_WATCHLIST(state, { stockId, quantity, stockPrice }) {
		const record = state.watchlist.find((element) => element.id == stockId);
		const index = state.watchlist.indexOf(record);
		state.watchlist.splice(index, 1);

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
};

const getters = {
	stockPortfolio(state, getters) {
		console.log(state.stocks);
		return state.stocks.map((stock) => {
			const record = getters.stocks.find((element) => element.ticker == stock.ticker);
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
	watchlist(state, getters) {
		return state.watchlist.map((stock) => {
			const record = getters.stocks.find((element) => element.id == stock.id);
			if (record) {
				return {
					id: stock.id,
					quantity: stock.quantity,
					name: record.name,
					price: record.price,
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
