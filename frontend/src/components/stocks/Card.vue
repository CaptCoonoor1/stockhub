<template>
  <div class="card" style="width: 18rem;">
    <img src="#" class="card-img-top" alt="Test" />
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p
        class="card-text"
      >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    <div
      class="card"
      v-if="showCard"
      style="width: 18rem; display: inline-block; text-align: center"
    >
      <img src="#" class="card-img-top" alt="Test" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p
          class="card-text"
        >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["stock"],
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    },
    watchlist() {
      return this.$store.getters.watchlist;
    },
    stockInWatchlist() {
      return this.watchlist.find(el => el.id == this.stock.id) ? true : false;
    }
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      // console.log(order);
      this.$store.dispatch("buyStock", order);
      this.quantity = 0;
    },
    addStockToWatchlist() {
      console.log(this);
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      // console.log(order);
      this.$store.dispatch("addStock", order);
    }
  }
};
</script>

<style scoped>
.danger {
  border: 1px solid red;
}
</style>
