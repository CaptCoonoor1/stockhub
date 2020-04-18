<template>
	<div class="card text-center" style="height: 30rem; width: 27rem; ">
		<div class="card-body">
			<br />
			<br />
			<br />
			<h5 class="card-title">
				<strong>Ticker: {{ stock.ticker }}</strong>
			</h5>
			<p class="card-text" style="margin: 20px">Current Price: {{ stock.price | currency }}</p>
			<p class="card-text" style="margin: 20px">Low: {{ stock.low | currency }}</p>
			<p class="card-text" style="margin: 20px">High: {{ stock.high | currency }}</p>
			<p class="card-text" style="margin: 20px">Change: {{ stock.change | currency }}</p>
			<p class="card-text" style="margin: 20px">Change Percent: {{ stock.changePercent }}</p>
			<input
				type="number"
				class="form-control pull-left"
				style="margin-left: 10px; width: 40%"
				@keyup.enter="buyStock"
				placeholder="Quantity"
				v-model="quantity"
				:class="{ danger: insufficientFunds }"
			/>
		</div>
		<button
			class="btn btn-success"
			@click="buyStock"
			:disabled="insufficientFunds || quantity <= 0 || !Number.isInteger(parseInt(quantity))"
		>
			{{ insufficientFunds ? 'Not Enough' : 'Buy' }}
		</button>
		<button class="btn btn-info" @click="addStockToWatchlist" :disabled="stockInWatchlist">
			{{ stockInWatchlist ? 'Added' : 'Add to Watchlist' }}
		</button>
	</div>
</template>

<script>
export default {
	props: ['stock'],
	data() {
		return {
			showCard: false,
			quantity: 0,
		};
	},
	computed: {
		funds() {
			return this.$store.getters.funds;
		},
		insufficientFunds() {
			return this.quantity * this.stock.price > this.funds;
		},
		watchlist() {
			return this.$store.getters.getWatchlist;
		},
		currentStock() {
			// Has properties ticker, price, high, low, change, changePercent
			return this.$store.getters.currentStock;
		},
		stockInWatchlist() {
			return this.watchlist.find((el) => el.ticker == this.currentStock.ticker) ? true : false;
		},
	},
	methods: {
		buyStock() {
			const order = {
				ticker: this.currentStock.ticker,
				price: this.currentStock.price,
				quantity: this.quantity,
			};
			// console.log(order);
			this.$store.dispatch('buyStock', order);
			this.quantity = 0;
		},
		addStockToWatchlist() {
			console.log(this);
			const order = {
				ticker: this.currentStock.ticker,
				price: this.currentStock.price,
			};
			// console.log(order);
			this.$store.dispatch('addStock', order);
		},
	},
};
</script>

<style scoped>
.danger {
	border: 1px solid red;
}
</style>
