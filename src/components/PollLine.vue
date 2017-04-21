<template>
	<div class="row list-item">
		<div class="col col-md-1 center">{{ poll.id }}</div>
		<div class="col col-md-7">{{ poll.question }}</div>
		<div class="col col-md-4">{{ poll.published_at }}</div>
	</div>
</template>

<script>
	export default {
		name: 'poll_line',
		props: {
			poll: Object
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>