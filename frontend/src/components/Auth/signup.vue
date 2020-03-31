<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Mail</label>
          <input
                  type="email"
                  id="email"
                  v-model="email">
        </div>
        <div class="input">
          <label for="age">Your Age</label>
          <input
                  type="number"
                  id="age"
                  v-model.number="age">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <div class="input">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  v-model="confirmPassword">
        </div>
        <div class="input">
          <label for="country">Country</label>
          <select id="country" v-model="country">
            <option value="usa">USA</option>
            <option value="india">India</option>
            <option value="uk">UK</option>
            <option value="germany">Germany</option>
          </select>
        </div>

        <div class="input inline">
          <input type="checkbox" id="terms" v-model="terms">
          <label for="terms">Accept Terms of Use</label>
        </div>
        <div class="submit">
          <div class="buttons">
            <button class="button is-medium is-primary is-rounded">Join now</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        country: 'usa',
        hobbyInputs: [],
        terms: false
      }
    },
    methods: {
      onAddHobby () {
        const newHobby = {
          id: Math.random() * Math.random() * 1000,
          value: ''
        }
        this.hobbyInputs.push(newHobby)
      },
      onDeleteHobby (id) {
        this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
      },
      onSubmit () {
        const formData = {
          email: this.email,
          age: this.age,
          password: this.password,
          confirmPassword: this.confirmPassword,
          country: this.country,
          terms: this.terms
        }
        console.log(formData)
      //  axios.post('/accounts:signUp?key=AIzaSyDR0JDNN3t6zkp3VoICH0QGDIKH6F2aGI4',
        //          {
          //          email: formData.email,
            //        password: formData.password,
              //      returnSecureToken: true
                //  })
          //.then(res=>console.log(res))
          //.catch(error => console.log(error))
          this.$store.dispatch('signup', formData)
      }
    }
  }
</script>

<style scoped>
.signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
}
.input {
    margin: 10px auto;
}
.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 2px;
  margin-top: 2px;
  font-size: 15px;
}

.input.inline label {
  display: inline;
  font-size: 10;
}

.input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    margin-left:10px;
    margin-right: -12px;

    box-sizing: border-box;
    border: 1px solid #ccc;
  }
.input.inline input {
    width: 40px;

  }
.input input:focus {
    outline: none;
    border: 1px solid #1EECAD;
    background-color: #eee;
  }
.input select {
    border: 1px solid #ccc;
    font: inherit;
    margin-left: 10px;
}
.hobbies button {
  color: black;
  padding: 6px;
  margin-top: 10px;
  margin-bottom: 10px;
  font: inherit;
  cursor: pointer;
}


.hobbies button:hover,
.hobbies button:active {
  background-color: #8d4288;
}

.hobbies input {
  width: 90%;
}

.submit button {
  margin-top: 10px;
}

</style>
