<template>
  <div class="login-form">
    <form>
      <fieldset>
        <legend>Login</legend>

        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" placeholder="Your Email " />

        <label for="password">Password:</label>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Your Password "
          @keyup.enter="loginButton"
        />
      </fieldset>
      <button type="button" class="submitButton" @click="loginButton">Log In!</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    loginButton() {
      const formData = {
        email: this.email,
        password: this.password
      };
      // console.log(formData);
      this.$store.dispatch("login", {
        email: formData.email,
        password: formData.password
      });
      // this.$vToastify.success('easy-peasy');
    }
  }
};
</script>

<style>
.login-form {
  max-width: 500px;
  padding: 10px 20px;
  background: #f4f7f8;
  margin: 10px auto;
  margin-top: 5%;
  margin-bottom: 6%;
  padding: 20px;
  background: #f4f7f8;
  border-radius: 20px;
  font-family: Georgia, "Times New Roman", Times, serif;
}
.login-form fieldset {
  border: none;
}
.login-form legend {
  font-size: 1.4em;
  margin-bottom: 10px;
}
.login-form label {
  display: block;
  margin-bottom: 8px;
}
.login-form input[type="text"],
.login-form input[type="date"],
.login-form input[type="datetime"],
.login-form input[type="email"],
.login-form input[type="number"],
.login-form input[type="search"],
.login-form input[type="time"],
.login-form input[type="url"],
.login-form input[type="password"],
.login-form textarea,
.login-form select {
  font-family: Georgia, "Times New Roman", Times, serif;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  font-size: 15px;
  margin: 0;
  outline: 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  background-color: #e8eeef;
  color: #8a97a0;
  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  margin-bottom: 30px;
}
.login-form input[type="text"]:focus,
.login-form input[type="date"]:focus,
.login-form input[type="datetime"]:focus,
.login-form input[type="email"]:focus,
.login-form input[type="number"]:focus,
.login-form input[type="search"]:focus,
.login-form input[type="time"]:focus,
.login-form input[type="url"]:focus,
.login-form textarea:focus,
.login-form select:focus {
  background: #d2d9dd;
}
.login-form select {
  -webkit-appearance: menulist-button;
  height: 35px;
}
.login-form .number {
  background: #1abc9c;
  color: #fff;
  height: 30px;
  width: 30px;
  display: inline-block;
  font-size: 0.8em;
  margin-right: 4px;
  line-height: 30px;
  text-align: center;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
  border-radius: 15px 15px 15px 0px;
}

.submitButton {
  /* .login-form input[type="submitButton"] { */
  position: relative;
  display: block;
  padding: 19px 39px 18px 39px;
  color: #fff;
  margin: 0 auto;
  background: #1abc9c;
  font-size: 18px;
  text-align: center;
  font-style: normal;
  width: 100%;
  border: 1px solid #16a085;
  border-width: 1px 1px 3px;
  margin-bottom: 10px;
}
.submitButton:hover {
  /* .login-form input[type="submitButton"]:hover { */
  background: #109177;
}
</style>