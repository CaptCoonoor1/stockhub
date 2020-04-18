<template>
	<div class="col-sm-6 col-md-4">
		<div class="panel panel-success">
			<div class="panel-heading">
				<h3 class="panel-title">
					{{ stock.name }}
					<small>Price: {{ stock.price }}</small>
				</h3>
			</div>
			<div class="panel-body">
				<div class="pull-left">
					<input
						type="number"
						class="form-control"
						placeholder="Quantity"
						v-model="quantity"
						:class="{ danger: insufficientFunds }"
					/>
				</div>
				<div class="pull-right">
					<button class="btn btn-info" @click="addStockToWatchlist" :disabled="stockInWatchlist">
						{{ stockInWatchlist ? 'Added' : 'Add to Watchlist' }}
					</button>
					<button
						class="btn btn-success"
						@click="buyStock"
						:disabled="insufficientFunds || quantity <= 0 || !Number.isInteger(parseInt(quantity))"
					>
						{{ insufficientFunds ? 'Not Enough' : 'Buy' }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['stock'],
	data() {
		return {
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
			return this.$store.getters.watchlist;
		},
		stockInWatchlist() {
			return this.watchlist.find((el) => el.ticker == this.stock.ticker) ? true : false;
		},
	},
	methods: {
		buyStock() {
			const order = {
				ticker: this.stock.ticker,
				price: this.stock.price,
				quantity: this.quantity,
			};
			// console.log(order);
			this.$store.dispatch('buyStock', order);
			this.quantity = 0;
		},
		addStockToWatchlist() {
			console.log(this);
			const order = {
				ticker: this.stock.ticker,
				price: this.stock.price,
				quantity: this.quantity,
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
