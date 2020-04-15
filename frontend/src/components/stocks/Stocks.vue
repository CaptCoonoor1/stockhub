<template>
  <div class="stocks" style="margin-bottom: 520px">
    <table>
      <tr>
        <td>
          <h1 style="margin: 8px 0 30px 30px">Your Available Funds: {{funds | currency}}</h1>
        </td>
        <input type="text" style="margin: 0 0 0 30px" placeholder="Ticker" v-model="ticker" />
        <button
          class="btn btn-primary"
          style="margin: 0 0 2px 8px"
          @click="getQuote"
        >Search for Stock</button>
        <td></td>
      </tr>
    </table>
    <app-card v-if="showCard" :s="currentStock"></app-card>
    <app-stock v-else v-for="stock in stocks" :stock="stock" :key="stock.id"></app-stock>
  </div>
</template>

<script>
import Stock from "./Stock.vue";
import Card from "./Card.vue";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      showCard: false,
      ticker: ""
    };
  },
  name: "Stocks",
  components: {
    appStock: Stock,
    appCard: Card
  },
  computed: {
    ...mapGetters({
      stocks: "stocks"
    }),
    funds() {
      return this.$store.getters.funds;
    },
    currentStock() {
      return this.ticker;
    }
    // stocks() {
    // 	return this.$store.getters.stocks;
    // },
  },
  methods: {
    getQuote: function() {
      console.log(this.currentStock);
      axios
        .post("/quote", {
          ticker: this.ticker,

          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
