import Vue from 'vue'
import Router from 'vue-router'

import api from '../api'
import Polls from '@/components/Polls'
import ConnectionLost from '@/components/ConnectionLost'
import PollDetail from '@/components/PollDetail'
import Share from '@/components/Share'


Vue.use(Router)

// TODO: Define domain and use it in Share page (!)

// Router configurations
const router = new Router({
	mode: 'history',
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

// Check the connection
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
