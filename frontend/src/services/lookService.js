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

function retrieveMoreLooksForExplore() {
	return fetch(
		lookAPI.RETRIEVE_MORE_LOOKS_EXPLORE.END_POINT.replace('lookId', 'SxEas8Hm'), {
			method: lookAPI.RETRIEVE_MORE_LOOKS_EXPLORE.METHOD,
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

function retrieveMoreLooks(config) {
	if (config.type=='LOOK') {
		return retrieveMoreLooksForLook(config.lookId, false);
	}
	if (config.type=='EXPLORE') {
		return retrieveMoreLooksForExplore();
	}
}