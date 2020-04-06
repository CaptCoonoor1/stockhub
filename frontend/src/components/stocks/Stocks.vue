<template>
	<div class="stocks" style="margin-bottom: 520px">
		<h1 style="margin-left: 30px">Your Available Funds: {{ funds | currency }}</h1>
		<app-stock v-for="stock in stocks" :stock="stock" :key="stock.id"></app-stock>
	</div>
</template>

<script>
import Stock from './Stock.vue';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
	name: 'Stocks',
	components: {
		appStock: Stock,
	},
	// created() {
	// 	axios
	// 		.get('/portfolio/get')
	// 		.then((res) => console.log(res))
	// 		.catch((err) => console.log(err));
	// },
	computed: {
		...mapGetters({
			stocks: 'stocks',
		}),
		funds() {
			return this.$store.getters.funds;
		},
		// stocks() {
		// 	return this.$store.getters.stocks;
		// },
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
