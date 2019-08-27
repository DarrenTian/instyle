import { userService } from './userService'

export const lookService = {
	retrieveLook,
	retrieveMoreLooks,
};

const lookAPI = {
	'RETRIEVE' : {
		'END_POINT': '/api/looks/lookId/',
		'METHOD': 'GET',
	},
	'RETRIEVE_MORE_LOOKS_FOR_LOOK' : {
		'END_POINT': '/api/looks/lookId/more_looks/',
		'METHOD': 'GET',
	},
	'RETRIEVE_MORE_LOOKS_EXPLORE' : {
		'END_POINT': '/api/looks/explore/',
		'METHOD': 'GET',
	},
	'RETRIEVE_MORE_LOOKS_FOLLOWING' : {
		'END_POINT': '/api/looks/following/',
		'METHOD': 'GET',
	},
	'RETRIEVE_MORE_USER_LOOKS' : {
		'END_POINT': '/api/looks/more_user_looks/',
		'METHOD': "POST",
	}
}

function getLookHeader() {
	return {
		'Accept': 'application/json',
        'Content-Type': 'application/json',
	}
}


function getAuthLookHeader() {
	return {
		'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ userService.getToken(),
	}
}

function retrieveLook(lookId, selfAuth) {
	return fetch(
		lookAPI.RETRIEVE.END_POINT.replace('lookId', lookId), {
			method: lookAPI.RETRIEVE.METHOD,
			headers: userService.isLoggedIn() ? getAuthLookHeader() : getLookHeader(),
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

function retrieveMoreLooksForLook(lookId) {
	return fetch(
		lookAPI.RETRIEVE_MORE_LOOKS_FOR_LOOK.END_POINT.replace('lookId', lookId), {
			method: lookAPI.RETRIEVE_MORE_LOOKS_FOR_LOOK.METHOD,
			headers: userService.isLoggedIn() ? getAuthLookHeader() : getLookHeader(),
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

function retrieveMoreLooksForExplore() {
	return fetch(
		lookAPI.RETRIEVE_MORE_LOOKS_EXPLORE.END_POINT, {
			method: lookAPI.RETRIEVE_MORE_LOOKS_EXPLORE.METHOD,
			headers: userService.isLoggedIn() ? getAuthLookHeader() : getLookHeader(),
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

function retrieveMoreLooksForUser(userId) {
	return fetch(
		lookAPI.RETRIEVE_MORE_USER_LOOKS.END_POINT, {
			method: lookAPI.RETRIEVE_MORE_USER_LOOKS.METHOD,
			headers: userService.isLoggedIn() ? getAuthLookHeader() : getLookHeader(),
			body: JSON.stringify({"user_id":userId}),
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

function retrieveMoreLooksForFollowing() {
	return fetch(
		lookAPI.RETRIEVE_MORE_LOOKS_FOLLOWING.END_POINT, {
			method: lookAPI.RETRIEVE_MORE_LOOKS_FOLLOWING.METHOD,
			headers: userService.isLoggedIn() ? getAuthLookHeader() : getLookHeader(),
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

function retrieveMoreLooks(config) {
	if (config.type=='LOOK') {
		return retrieveMoreLooksForLook(config.lookId, false);
	}
	if (config.type=='EXPLORE') {
		return retrieveMoreLooksForExplore();
	}
	if (config.type=='USER_LOOK') {
		return retrieveMoreLooksForUser(config.userId);
	}
	if (config.type=='FOLLOWING') {
		return retrieveMoreLooksForFollowing();
	}
}