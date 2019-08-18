import { userService } from './userService'

export const lookService = {
	retrieveLook,
	retrieveMoreLooksForLook,
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
			headers: selfAuth? getAuthLookHeader() : getLookHeader(),
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

function retrieveMoreLooksForLook(lookId, selfAuth) {
	return fetch(
		lookAPI.RETRIEVE_MORE_LOOKS_FOR_LOOK.END_POINT.replace('lookId', lookId), {
			method: lookAPI.RETRIEVE_MORE_LOOKS_FOR_LOOK.METHOD,
			headers: selfAuth? getAuthLookHeader() : getLookHeader(),
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