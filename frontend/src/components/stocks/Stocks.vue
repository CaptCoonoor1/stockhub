<template>
	<div class="stocks">
		<app-stock v-for="stock in stocks" :stock="stock" :key="stock.id"></app-stock>
	</div>
</template>

<script>
import Stock from './Stock.vue';
import { mapGetters } from 'vuex';

export default {
	name: 'Stocks',
	components: {
		appStock: Stock,
	},
	computed: {
		...mapGetters({
			stocks: 'stocks',
		}),
		// stocks() {
		// 	return this.$store.getters.stocks;
		// },
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped></style>
