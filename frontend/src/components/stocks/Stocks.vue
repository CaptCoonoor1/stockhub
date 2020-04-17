<template>
	<div class="stocks" style="margin-bottom: 520px">
		<table>
			<tr>
				<td>
					<h1 style="margin: 8px 0 30px 30px">Your Available Funds: {{ funds | currency }}</h1>
				</td>
				<input type="text" style="margin: 0 0 0 30px" placeholder="Ticker" v-model="ticker" />
				<button
					:disabled="ticker == ''"
					class="btn btn-primary"
					style="margin: 0 0 2px 8px"
					@click="getQuote"
				>
					Search for Stock
				</button>
				<td></td>
			</tr>
		</table>

		<app-card
			v-if="inputEmpty"
			:stock="currentStock"
			style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"
		></app-card>
		<app-stock v-else v-for="stock in stocks" :stock="stock" :key="stock.id"></app-stock>
	</div>
</template>

<script>
import Stock from './Stock.vue';
import Card from './Card.vue';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			showCard: true,
			ticker: '',
			inputEmpty: false,
		};
	},
	name: 'Stocks',
	components: {
		appStock: Stock,
		appCard: Card,
	},
	computed: {
		...mapGetters({
			stocks: 'stocks',
			currentStock: 'currentStock',
		}),
		funds() {
			return this.$store.getters.funds;
		},
	},
	methods: {
		getQuote: function() {
			this.inputEmpty = true;
			this.$store.dispatch('updateCurrent', this.ticker);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.danger {
	border: 1px solid red;
}
</style>
