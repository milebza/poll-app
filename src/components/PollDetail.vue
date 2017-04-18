<template>
<div class="page-poll-detail">
	<div class="row header">
        <div class="col col-md-8"><h3>{{ poll.id + '. ' + poll.question }}</h3></div>
        <div class="col col-md-4 right"><router-link :to="'/'">< back</router-link></div>
    </div>

    <!-- Options list -->
    <div v-for="choice in poll.choices">
        <label :for="choice.choice">
        <div class="row list-item">
            <div class="col col-md-4 center"><input type="radio" name="choice" :id="choice.choice"></div>
            <div class="col col-md-4">{{ choice.choice }}</div>
            <div class="col col-md-4">{{ choice.votes }} {{ choice.votes === 1 ? 'vote' : 'votes' }}</div>
        </div>
        </label>
    </div>

    <!-- Buttons -->
    <div class="row buttons-wrapper">
        <div class="col col-md-3 center"><a class="vote-btn" v-on:click="vote()">Vote</a></div>
        <div class="col col-md-3 center"><router-link class="share-btn" :to="'/share?url=questions/' + poll.id">Share</router-link></div>
        <div class="col col-md-6"></div>
    </div>
</div>
</template>

<script>
import api from '../api'

export default {
  name: 'poll_detail',
  data: function() {
    return {
        poll: {}
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
        ++this.poll.votes
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
    padding: 10px 12px;
    border-radius: 1px;
    background-color: $bck-color;
}

h3 {
  color: #00cc99;
  margin: 0;
}

a {
    color: black;
}

input[type="radio"]:checked > .row {}

.buttons-wrapper {
    margin-top: 5px;
    a {
        text-decoration: none;
    }

    .col {
        padding: 0 5px 0 0;
        @media(max-width:800px) {
            padding: 0;
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