<template>
  <div style="margin-bottom: 520px">
    <h1 style="margin: 0 0 30px 30px">Your Available Funds: {{funds | currency}}</h1>
    <app-stock v-for="stock in watchlist" :stock="stock" :key="stock.id"></app-stock>
  </div>
</template>

<script>
import Stock from "./Stock.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    appStock: Stock
  },
  computed: {
    ...mapGetters({
      watchlist: "watchlist"
    }),
    funds() {
      return this.$store.getters.funds;
    }
  }
};
</script>

<style>
</style>