const state = {
	funds: 10000,
	stocks: [],
	watchlist: [],
};

const mutations = {
	BUY_STOCK(state, { stockId, quantity, stockPrice }) {
		const record = state.stocks.find(element => element.id == stockId);
		if (record) {
			console.log(record);
			record.quantity += quantity;
		} else {
			state.stocks.push({
				id: stockId,
				quantity: quantity,
			});
		}
		state.funds -= stockPrice * quantity;
	},
	SELL_STOCK(state, { stockId, quantity, stockPrice }) {
		const record = state.stocks.find(element => element.id == stockId);
		if (record.quantity > quantity) {
			record.quantity -= quantity;
		} else {
			state.stocks.splice(state.stocks.indexOf(record), 1);
		}
		state.funds += stockPrice * quantity;
	},
	ADD_STOCK(state, { stockId, quantity, stockPrice }) {
		const record = state.watchlist.find(element => element.id == stockId);

		if (record) {
			alert('Already added!');
		} else {
			state.watchlist.push({
				id: stockId,
				quantity: quantity,
			});
		}
	},
};

const actions = {
	sellStock({ commit }, order) {
		commit('SELL_STOCK', order);
	},
};

const getters = {
	stockPortfolio(state, getters) {
		return state.stocks.map(stock => {
			const record = getters.stocks.find(element => element.id == stock.id);
			return {
				id: stock.id,
				quantity: stock.quantity,
				name: record.name,
				price: record.price,
			};
		});
	},
	watchlist(state, getters) {
		return state.watchlist.map(stock => {
			const record = getters.stocks.find(element => element.id == stock.id);
			return {
				id: stock.id,
				quantity: stock.quantity,
				name: record.name,
				price: record.price,
			};
		});
	},
	funds(state) {
		return state.funds;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
