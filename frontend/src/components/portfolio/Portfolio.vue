<template>
  <div style="margin-bottom: 520px">
    <h1 style="margin-left: 30px">Your Available Funds: {{funds | currency}}</h1>
    <app-stock v-for="stock in stocks" :stock="stock" :key="stock.id"></app-stock>
  </div>
</template>

<script>
import Stock from "./Stock.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      stocks: "stockPortfolio"
    }),
    funds() {
      return this.$store.getters.funds;
    }
  },
  components: {
    appStock: Stock
  }
};
</script>

<style>
</style>