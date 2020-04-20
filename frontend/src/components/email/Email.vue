<template>
  <div style="margin: 225px 550px">
    <h1>Your Email Has Been Verified! Click below to be redirected to login.</h1>
    <button class="btn-primary" style="margin: 15px 200px" @click="this.redirect">Redirect</button>
  </div>
</template>

<script>
export default {
  methods: {
    redirect() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style>
</style>