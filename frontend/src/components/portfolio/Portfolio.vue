<template>
  <!-- <div class="tile is-5" style="margin: 80px 0px 80px 350px">
    <article class="tile is-child notification is-primary">
      <p class="title">Welcome!</p>
      <!-- <figure class="image"style="padding: 0rem 10rem 1.5rem 9rem" >
              <img src="../../assets/porf2.png">
  </figure>-->
  <!-- <h1 v-if="email" style="padding: 0rem 5rem 0rem 8rem">
        You login as
        <Strong>{{ email }}</Strong>
      </h1>
      <h1 style="padding: 2rem 5rem 3rem 8rem">Your Available Funds: {{funds | currency}}</h1>
      <app-stock v-for="stock in stocks" :stock="stock" :key="stock.id"></app-stock>
    </article>
  </div>-->

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
