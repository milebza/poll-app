<template>
	<div class="container">
		<!-- component matched by the route will render here -->
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Roboto:300,400');

	body {
		font-family: Roboto, sans-serif;
		font-size: 15px;
	}

	.container {

		@media(max-width:800px) {
			margin: 0 10px;
		}

		p {
			font-size: 16px;
			margin-bottom: 40px;
		}

		.list-item {
			cursor: pointer;
			background-color: #ccffcc;
			padding: 10px 0;
			margin-bottom: 5px;

			&:hover {
				background-color: #bce4bc;
			}

			@media(max-width:800px) {
				text-align: center;
			}
		}

		.center {
			text-align: center;
		}

		.right {
			text-align: right;
		}

		.left {
			text-align: left;
		}
	}
</style>
