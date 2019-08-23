import { userService } from './userService'

export const socialService = {
	toggleLike,
};

const socialAPI = {
	'LIKE' : {
		'END_POINT': '/api/social/like/',
		'METHOD': 'POST',
	},
	'UNLIKE' : {
		'END_POINT': '/api/social/unlike/',
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

function toggleLike(lookId, likeState) {
	if (likeState==true) {
		return unlike(lookId);
	} else {
		return like(lookId);
	}
}

function like(lookId){
	return fetch(
		socialAPI.LIKE.END_POINT, {
			method: socialAPI.LIKE.METHOD,
			headers: getAuthLookHeader(),
			body: JSON.stringify({"look_id":lookId}),
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


function unlike(lookId){
	return fetch(
		socialAPI.UNLIKE.END_POINT, {
			method: socialAPI.UNLIKE.METHOD,
			headers: getAuthLookHeader(),
			body: JSON.stringify({"look_id":lookId}),
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

