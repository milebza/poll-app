<template>
    <div class="page-polls">
    <h2>Poll</h2>

    <div class="row">
        <!-- Strapline -->
        <div class="col col-md-7"><p>Pick a question and start voting!</p></div>

        <!-- Search filter -->
        <div class="col col-md-5">
            <div class="pull-right">
                <input type="text" placeholder="Type and click enter" v-model="filterString" v-on:keyup.enter="filterPolls">
                <span class="cancel-button" v-on:click="clearSearch">Clear</span>
                <router-link v-if="canShare && filterString !== ''" class="button" :to="'/share?url=questions?query_filter=' + filterString">Share</router-link>
            </div>
        </div>
    </div>

    <!-- Question list -->
    <div v-for="poll in polls">
        <poll-line :poll="poll" v-on:click.native="goTo('/questions/' + poll.id)"></poll-line>
    </div>

    <!-- More button -->
    <div class="row">
        <div class="col col-md-12 center"><span class="show-button">Show more</span></div>
    </div>
    </div>  
</template>

<script>

import api from '../api'
import PollLine from '@/components/PollLine'

export default {
  name: 'polls',
  data: function() {
    return {
      polls: [],
      filterString: '',
      canShare: false
    }
  },
  created: function() {
    const that = this
    api.getPolls(10, 10, '').then(function(response) {
      that.polls = response.data
    })
  },
  components: {
    'poll-line': PollLine
  },
  methods: {
    goTo: function(path) {
        this.$router.push(path)
    },
    filterPolls: function() {
        const that = this
        this.canShare = true
        api.getPolls(10, 10, this.filterString).then(function(response) {
          that.polls = response.data
        })
    },
    clearSearch: function() {
      this.canShare = false
      this.filterString = ''
      api.getPolls(10, 10, '').then(function(response) {
        that.polls = response.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h2 {
  color: #00cc99;
}

input[type="text"] {
  padding: 5px 8px;
}

a {
    text-decoration: none;
}

.cancel-button {
  cursor: pointer;
  color: #bce4bc;
  padding: 5px 10px;
  border-radius: 1px;
  border: 2px solid #bce4bc;
}

.button {
  cursor: pointer;
  color: white;
  padding: 7px 12px;
  border-radius: 1px;
  background-color: #bce4bc;
}
</style>
