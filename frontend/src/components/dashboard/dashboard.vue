<template>
	<div id="dashboard">
		<h1>You're successful login!</h1>

		<p v-if="email">Your email address: {{ email }}</p>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	computed: {
		email() {
			return !this.$store.getters.user ? false : this.$store.getters.user.email;
		},
	},
	created() {
		this.$store.dispatch('fetchUser');
	},
};
</script>

<style scoped>
h1,
p {
	text-align: center;
}

p {
	margin-top: 10px;
	margin-bottom: 10px;
	color: red;
}
</style>
