<template>
	<div class="page-share">
		<div class="row">
			<div class="col col-md-12"><h3>URL you'll be sharing:</h3><a v-model="contentUrl">localhost:8080/{{ $route.query.url }}</a></div>
		</div>
		<div class="row">
			<div class="col col-md-12"><input v-model="email" type="email" placeholder="Enter your email" v-focus></div>
		</div>
		<div class="row">
			<div class="col col-md-12"><span class="btn" v-on:click="share()">Share</span></div>
		</div>
	</div>
</template>

<script>
	import api from '../api'

	export default {
		name: 'share',
		data: function() {
			return {
				email: '',
				contentUrl: ''
			}
		},
		methods: {
			share: function() {
				const that = this
				api.shareUrl(this.email, this.contentUrl).then(function(response) {
					console.log(response)
					that.$router.push('/')
				})
			}
		},
		directives: {
			focus: {
				inserted: function (el) {
					el.focus()
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	h3 {
		margin: 0 0 5px;
	}

	.row {
		font-size: 15px;
	}

	.page-share {
		width: 50%;
		margin: 50px auto;
		text-align: center;

		@media(max-width:800px) {
			width: auto;
		}
	}

	input[type="email"] {
		margin: 30px 0 15px;
		width: 210px;
		padding: 5px 8px;
		text-align: center;
	}

	.btn {
		width: 100px;
		cursor: pointer;
		color: white;
		padding: 10px 20px;
		border-radius: 1px;
		background-color: #00cc99;
	}
</style>