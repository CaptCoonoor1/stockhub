<template>
	<div class="col-sm-6 col-md-4">
		<div class="panel panel-success">
			<div class="panel-heading">
				<h3 class="panel-title">
					{{ stock.ticker }}
					<small>Price: {{ stock.price | currency }}</small>
				</h3>
			</div>
			<div class="panel-body">
				<div class="pull-left">
					<input type="number" class="form-control" placeholder="quantity" v-model="quantity" />
				</div>
				<div class="pull-right">
					<button class="btn btn-danger" @click="removeStockFromWatchList">Remove</button>
					<button
						class="btn btn-success"
						:disabled="
							insufficientFunds || this.quantity <= 0 || !Number.isInteger(parseInt(quantity))
						"
						@click="buyStock"
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
	},
	methods: {
		buyStock() {
			const order = {
				ticker: this.stock.ticker,
				price: this.stock.price,
				quantity: this.quantity,
			};
			this.$store.dispatch('buyStock', order);
			console.log(order);
			this.quantity = 0;
		},
		removeStockFromWatchList() {
			const order = {
				ticker: this.stock.ticker,
				price: this.stock.price,
				quantity: this.quantity,
			};
			console.log(order);
			this.$store.dispatch('remove', order);
		},
	},
};
</script>
