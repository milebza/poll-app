import axios from 'axios'

// copy axios object to api with custom configs
const api = axios.create({
	baseURL: 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com'
})

export default {
	getHealth: function() {
		return api.get('/health')
	},
	getPolls: function(limit, offset, filter) {
		return api.get('/questions?limit=' + limit + '&offset=' + offset + '&filter=' + filter)
	},
	getPollDetail: function(id) {
		return api.get('/questions/' + id)
	},
	updatePoll: function(id, poll) {
		return api.put('questions/' + id, poll)
	},
	shareUrl: function(email, contentUrl) {
		return api.post('share?destination_email=' + email + '&content_url=' + contentUrl)
	}
}