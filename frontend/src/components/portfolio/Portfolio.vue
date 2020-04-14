<template>
  <div style="margin-bottom: 520px">
    <h1 style="margin: 0 0 30px 30px">Your Available Funds: {{funds | currency}}</h1>
    <app-stock v-for="stock in stocks" :stock="stock" :key="stock.id"></app-stock>
  </div>
</template>

<script>
import Stock from "./Stock.vue";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  computed: {
    email() {
      return !this.$store.getters.user ? false : this.$store.getters.user.email;
    },
    ...mapGetters({
      stocks: "stockPortfolio"
    }),
    funds() {
      return this.$store.getters.funds;
    }
  },
  created() {
    this.$store.dispatch("fetchUser");
  },
  components: {
    appStock: Stock
  }
};
</script>

<style lang="sass" scoped>
</style>
