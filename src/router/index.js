import Vue from 'vue'
import Router from 'vue-router'

import api from '../api'
import Polls from '@/components/Polls'
import ConnectionLost from '@/components/ConnectionLost'
import PollDetail from '@/components/PollDetail'
import Share from '@/components/Share'


Vue.use(Router)

// Extend router and add getDomain method?

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Polls',
      component: Polls
    },
    {
      path: '/questions',
      name: 'Questions',
      component: Polls
    },
    {
    	path: '/questions/:id',
    	name: 'PollDetail',
    	component: PollDetail
    },
    {
      path: '/share/',
      name: 'Share',
      component: Share
    },
    {
    	path: '/connection-lost',
    	name: 'ConnectionLost',
    	component: ConnectionLost
    }
  ]
})

// Investigate if there's better method
router.beforeEach(function(to, from, next) {

	if (to.name === 'ConnectionLost') {
		return next()
	} 

	api.getHealth().then(function(response) {
		next()
	}).catch(function() {
		next('/connection-lost')
	})
})

export default router
