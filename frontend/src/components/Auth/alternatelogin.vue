<template>
  <div class="signup-form">
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
.signup-form {
  max-width: 500px;
  padding: 10px 20px;
  background: #f4f7f8;
  margin: 10px auto;
  margin-bottom: 120px;
  padding: 20px;
  background: #f4f7f8;
  border-radius: 8px;
  font-family: Georgia, "Times New Roman", Times, serif;
}
.signup-form fieldset {
  border: none;
}
.signup-form legend {
  font-size: 1.4em;
  margin-bottom: 10px;
}
.signup-form label {
  display: block;
  margin-bottom: 8px;
}
.signup-form input[type="text"],
.signup-form input[type="date"],
.signup-form input[type="datetime"],
.signup-form input[type="email"],
.signup-form input[type="number"],
.signup-form input[type="search"],
.signup-form input[type="time"],
.signup-form input[type="url"],
.signup-form input[type="password"],
.signup-form textarea,
.signup-form select {
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
.signup-form input[type="text"]:focus,
.signup-form input[type="date"]:focus,
.signup-form input[type="datetime"]:focus,
.signup-form input[type="email"]:focus,
.signup-form input[type="number"]:focus,
.signup-form input[type="search"]:focus,
.signup-form input[type="time"]:focus,
.signup-form input[type="url"]:focus,
.signup-form textarea:focus,
.signup-form select:focus {
  background: #d2d9dd;
}
.signup-form select {
  -webkit-appearance: menulist-button;
  height: 35px;
}
.signup-form .number {
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
  /* .signup-form input[type="submitButton"] { */
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
  /* .signup-form input[type="submitButton"]:hover { */
  background: #109177;
}
</style>