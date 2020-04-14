<template>
  <div class="stocks" style="margin-bottom: 520px">
    <h1 style="margin: 0 0 30px 30px">Your Available Funds: {{funds | currency}}</h1>
    <app-stock v-for="stock in stocks" :stock="stock" :key="stock.id"></app-stock>
  </div>
</template>

<script>
import Stock from "./Stock.vue";
import { mapGetters } from "vuex";

export default {
  name: "Stocks",
  components: {
    appStock: Stock
  },
  computed: {
    ...mapGetters({
      stocks: "stocks"
    }),
    funds() {
      return this.$store.getters.funds;
    }
    // stocks() {
    // 	return this.$store.getters.stocks;
    // },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
