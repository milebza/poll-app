<template>
	<div class="page-poll-detail">
		<div class="row header">
			<div class="col col-md-8"><h3>{{ poll.id + '. ' + poll.question }}</h3></div>
			<div class="col col-md-4 right"><router-link :to="'/'" class="back-btn">< back</router-link></div>
		</div>

		<!-- Options list -->
		<div v-for="choice in poll.choices">
			<label :for="choice.choice">
				<div class="row list-item">
					<div class="col col-md-4 center">{{ choice.choice }}</div>
					<div class="col col-md-4 center">{{ choice.votes }} {{ choice.votes === 1 ? 'vote' : 'votes' }}</div>
					<div class="col col-md-4 center"><input type="radio" name="choice" v-model="choicePicked" :value="choice.choice" :id="choice.choice"></div>
				</div>
			</label>
		</div>

		<!-- Buttons -->
		<div class="row buttons-wrapper">
			<div class="col col-md-8"></div>
			<div class="col col-md-2 center"><a class="vote-btn" v-on:click="vote()">Vote</a></div>
			<div class="col col-md-2 center"><router-link class="share-btn" :to="'/share?url=questions/' + poll.id">Share</router-link></div>
		</div>
	</div>
</template>

<script>
	import api from '../api'

	export default {
		name: 'poll_detail',
		data: function() {
			return {
				poll: {},
				choicePicked: ''
			}
		},
		created: function() {
			const that = this
			api.getPollDetail(this.$route.params.id).then(function(response) {
				that.poll = response.data
			})
		},
		methods: {
			vote: function () {
				const that = this
				this.poll.choices.forEach(function(choice) {
					if (choice.choice === that.choicePicked) {
						choice.votes += 1
					}
				})
				api.updatePoll(this.poll.id, this.poll).then(function(response) {
					that.poll = response.data
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@mixin button($color, $bck-color) {
		cursor: pointer;
		color: $color;
		padding: 12px 12px;
		border-radius: 1px;
		background-color: $bck-color;
	}

	h3 {
		color: #00cc99;
		margin: 0;
	}

	a {
		text-decoration: none;
	}

	.back-btn {
		color: black;
		padding-bottom: 2px;
		border-bottom: 1px solid white;

		&:hover {
			border-bottom: 1px solid black;
		}
	}

	.buttons-wrapper {
		margin-top: 5px;

		.col {
			padding: 0 0 0 5px;
			@media(max-width:800px) {
				padding: 0 0 5px 0;
			}
		}
	}

	.vote-btn {
		display: block;
		@include button(white, #00cc99);
	}

	.share-btn {
		display: block;
		@include button(white, #bce4bc);
	}
</style>