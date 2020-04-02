<template>
	<div id="app">
		<nav class="navbar" role="navigation" aria-label="main navigation">
			<div class="navbar-brand"></div>

			<div id="navbarBasicExample" class="navbar-menu">
				<div class="navbar-start">
					<a class="navbar-item">
						<router-link to="/">StockSim</router-link>
					</a>
				</div>

				<div class="navbar-end">
					<div class="navbar-item">
						<router-link to="/">Home</router-link>
						<router-link to="/portfolio">Portfolio</router-link>
						<router-link to="/stocks">Stocks</router-link>

						<li v-if="auth">
							<router-link to="/dashboard">Dashboard</router-link>
						</li>
					</div>
					<div class="buttons">
						<li v-if="auth">
							<button @click="onLogout" class="button is-primary is-active">Logout</button>
						</li>
						<li v-if="!auth">
							<router-link to="/signup" class="button is-primary">
								<Strong>Sign up</Strong>
							</router-link>
						</li>
						<li v-if="!auth">
							<router-link to="/login" class="button is-light">Login</router-link>
						</li>
					</div>
				</div>
			</div>
		</nav>
		<router-view></router-view>
		<app-footer style="margin-top: 400px"></app-footer>
	</div>
</template>

<script>
import Footer from './components/footer/Footer.vue';
export default {
	name: 'App',
	components: {
		appFooter: Footer,
	},
	computed: {
		auth() {
			return this.$store.getters.isAuthenticated;
		},
	},
	methods: {
		onLogout() {
			this.$store.dispatch('logout');
		},
	},
	created() {
		console.log('created');
		this.$store.dispatch('initStocks');
	},
};
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
.logout
  background-color: #1EECAD
  border: none
  font: inherit
  color: #383838
  cursor: pointer
  margin-bottom: 0.5rem
</style>
