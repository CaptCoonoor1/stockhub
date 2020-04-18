<template>
	<div class="col-sm-6 col-md-4">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h3 class="panel-title">
					{{ stock.ticker }}
					<small>Price: {{ stock.price | currency }} | Quantity: {{ stock.quantity }}</small>
				</h3>
			</div>
			<div class="panel-body">
				<div class="pull-left">
					<input
						type="number"
						class="form-control"
						placeholder="Quantity"
						v-model="quantity"
						:class="{ danger: insufficientQuantity }"
					/>
				</div>
				<div class="pull-right">
					<button
						class="btn btn-success"
						@click="sellStock"
						:disabled="
							insufficientQuantity || quantity <= 0 || !Number.isInteger(parseInt(quantity))
						"
					>
						{{ insufficientQuantity ? 'Not Enough' : 'Sell' }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	props: ['stock'],
	data() {
		return {
			quantity: 0,
		};
	},
	computed: {
		insufficientQuantity() {
			return this.quantity > this.stock.quantity;
		},
		currentStock() {
			// Has properties ticker, price, high, low, change, changePercent
			return this.$store.getters.currentStock;
		},
	},
	methods: {
		...mapActions({ placeSellOrder: 'sellStock' }),
		sellStock() {
			// console.log(this.currentStock);
			// console.log(this.quantity);

			const order = {
				ticker: this.stock.ticker,
				price: this.stock.price,
				quantity: this.quantity,
			};
			this.placeSellOrder(order);
			this.quantity = 0;
		},
	},
};
</script>

<style scoped>
.danger {
	border: 1px solid red;
}
.negative {
	color: red;
}
.positive {
	color: green;
}
</style>
