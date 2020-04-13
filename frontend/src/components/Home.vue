<template>
	<div class="home">
		<section class="hero">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">{{ heading }}</h1>
					<div class="is-two-thirds column is paddingless">
						<h2 class="subtitle is-4">{{ subheading }}</h2>
					</div>
					<div class="buttons">
						<router-link to="/signup" class="button is-medium is-primary is-rounded"
							>Join now</router-link
						>
					</div>
				</div>
			</div>
		</section>

		<body>
			<section class="section">
				<div class="container">
					<h1 class="title">What is StockSim?</h1>
					<h2 class="subtitle">
						Our website allows students to build their own virtual stock portfolio, which is linked
						up to stock prices in real time and allows students to see how their portfolio changes
						over time. It is unmatched, and has shown an upwards trend in student attendance,
						engagement and class participation as well as improved academic performance and
						financial behavior.
					</h2>

					<h1 class="title">Mobile App</h1>
					<h2 class="subtitle">
						Our mobile app works in tandem with student team portfolios, engaging students in a
						meaningful second-screen experience.
					</h2>
				</div>
			</section>
		</body>
	</div>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {
			heading: 'Stock Market Game',
			subheading: 'Start with $10,000 in virtual cash and put your trading skills to the test!',
		};
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '../mq'

.hero
  background: url(../assets/hero.jpg)
  background-size: cover
  margin-top: -2rem

  .title
    +desktop
    font-size: 4rem
    margin-top: 4rem
.container
  margin-left: 4rem

h1
  margin-top: 3rem !important
h2
  color: #D4DBD9

  margin: 1rem 0 3rem 0 !important

.section h1
  color: #1EECAD
.section h2
  color: black
</style>
