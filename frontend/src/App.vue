<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">

  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        <router-link to="/">StockHub</router-link>
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <router-link to="/">Home</router-link>

          </div>
          <div class="buttons">

          <router-link to="/signup" class="button is-primary"><Strong>Sign up</Strong></router-link>

          <router-link to="/login" class="button is-light">Login</router-link>

        </div>

    </div>
  </div>
</nav>
    <router-view></router-view>

    <footer class="footer">
      <div class="container">
        <div class="content">
          <div class="content has-text-centered">
            <p>
             <strong>StockHubb</strong> by Group 18 from <a href="https://catalog.ucf.edu/preview_course_nopop.php?catoid=3&coid=6690">UCF COP4331</a>
            </p>
            <p>
              Copyrights @ Group18 Spring 2020
            </p>
          </div>

        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="sass">
@import '../node_modules/bulma/bulma.sass'
@import 'mq'

.navbar
  background-color: #383838

.navbar-start a
  color: #1EECAD
  font-weight: bold
  font-size: 30px

.navbar-start
  padding-left: 5rem

.navbar-end
  padding-right: 5rem
.navbar-end a
  color: #c1c1c1
  padding: 0.5rem 1.75rem 0.5rem

.footer
  background-color: #383838

.footer strong
    color: #1EECAD
.footer p
  color: white


</style>
