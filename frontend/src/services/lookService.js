export const lookService = {
	retrieveLook,
};

const lookAPI = {
	'RETRIEVE' : {
		'END_POINT': '/api/looks/lookId/',
		'METHOD': 'GET',
	},
}

function getLookHeader() {
	return {
		'Accept': 'application/json',
        'Content-Type': 'application/json',
	}
}

function retrieveLook(lookId) {
	return fetch(
		lookAPI.RETRIEVE.END_POINT.replace('lookId', lookId), {
			method: lookAPI.RETRIEVE.METHOD,
			headers: getLookHeader(),
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