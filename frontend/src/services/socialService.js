import { requestUtil } from './requestUtil'

export const socialService = {
	toggleLike,

	followUser,
	unfollowUser,
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
	'FOLLOW' : {
		'END_POINT': '/api/social/follow/',
		'METHOD': 'POST',
	},
	'UNFOLLOW' : {
		'END_POINT': '/api/social/unfollow/',
		'METHOD': 'POST',
	},
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
			headers: requestUtil.getAuthorizedHeader(),
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
			headers: requestUtil.getAuthorizedHeader(),
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

function followUser(userId) {
	return fetch(
		socialAPI.FOLLOW.END_POINT, {
			method: socialAPI.FOLLOW.METHOD,
			headers: requestUtil.getAuthorizedHeader(),
			body: JSON.stringify({"user_id":userId}),
		}).then(response=> {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject("cannot follow");
			}
		})
}

function unfollowUser(userId) {
	return fetch(
		socialAPI.UNFOLLOW.END_POINT, {
			method: socialAPI.UNFOLLOW.METHOD,
			headers: requestUtil.getAuthorizedHeader(),
			body: JSON.stringify({"user_id":userId}),
		}).then(response=> {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject("cannot follow");
			}
		})
}

