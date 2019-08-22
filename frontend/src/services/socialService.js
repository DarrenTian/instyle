import { userService } from './userService'

export const socialService = {
	like,
};

const socialAPI = {
	'LIKE' : {
		'END_POINT': '/api/social/like/',
		'METHOD': 'POST',
	},
}

function getAuthLookHeader() {
	return {
		'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ userService.getToken(),
	}
}

function like(lookId) {
	return fetch(
		socialAPI.LIKE.END_POINT, {
			method: socialAPI.LIKE.METHOD,
			headers: getAuthLookHeader(),
			body: JSON.stringify({"lookId":lookId}),
		})
      .then(response => {
      	if (response.ok) {
      		return response.json();
      	} else {
      		const error = response.statusText;
			return Promise.reject(error);
      	}
     })
}
