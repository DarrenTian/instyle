import { userService } from './userService'

export const userLookService = {
	listUserLook,
	createUserLook,
	retrieveUserLook,
	destroyUserLook,
	updateUserLook,

	setUserLookImage,

	getCoverImage,
};

const userLookAPI = {
	'LIST' : {
		'END_POINT': '/api/user_looks/',
		'METHOD': 'GET',
	},
	'CREATE' : {
		'END_POINT': '/api/user_looks/',
		'METHOD': 'POST',
	},
	'RETRIEVE' : {
		'END_POINT': '/api/user_looks/lookId/',
		'METHOD': 'GET',
	},
	'DESTROY' : {
		'END_POINT': '/api/user_looks/lookId/',
		'METHOD': 'DELETE',
	},
	'UPDATE' : {
		'END_POINT': '/api/user_looks/lookId/',
		'METHOD': 'PUT',
	},
	'SET_IMAGE' : {
		'END_POINT': '/api/user_looks/lookId/set_image/',
		'METHOD': 'POST',
	},
}

function getUserLookHeader() {
	return {
		'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ userService.getToken(),
	}
}

function getUserLookHeaderForFile() {
	return {
		'Accept': 'application/json',
        'Authorization': 'Token '+ userService.getToken(),
	}
}

function listUserLook() {
	return fetch(
		userLookAPI.LIST.END_POINT, {
            method: userLookAPI.LIST.METHOD,
            headers: getUserLookHeader(),
        })
		.then(response => {
			return response.json();
		})
		.then(looks => {
			return looks;
		});
}

function createUserLook() {
	return fetch(
		userLookAPI.CREATE.END_POINT, {
	        method: userLookAPI.CREATE.METHOD,
	        headers: getUserLookHeader(),
    })
	.then(response => {
		return response.json();
	});
}

function retrieveUserLook(lookId) {
	return fetch(
		userLookAPI.RETRIEVE.END_POINT.replace('lookId', lookId), {
			method: userLookAPI.RETRIEVE.METHOD,
			headers: getUserLookHeader(),
		})
      .then(response => {
      	if (response.ok) {
      		return response.json();
      	} else {
      		return Promise.reject("cannot get look");
      	}
      })
}

function destroyUserLook(lookId) {
	return fetch(
		userLookAPI.DESTROY.END_POINT.replace('lookId', lookId), {
			method: userLookAPI.DESTROY.METHOD,
			headers: getUserLookHeader(),
		})
		.then(response => {
			if (response.status != 204) {
				return Promise.reject("cannot remove look");
			}
		});
}

function updateUserLook(lookId, look) {
	return fetch(
		userLookAPI.UPDATE.END_POINT.replace('lookId', lookId), {
			method: userLookAPI.UPDATE.METHOD,
			headers: getUserLookHeader(),
            body: JSON.stringify(look),
        })
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject("cannot update look");
			}
		})
}

function setUserLookImage(lookId, file) {
	return fetch(
		userLookAPI.SET_IMAGE.END_POINT.replace('lookId', lookId), {
			method: userLookAPI.SET_IMAGE.METHOD,
			headers: getUserLookHeaderForFile(),
            body: file,
		})
	.then(response => {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject("cannot set look image");
		}
	})
}

function getCoverImage(look) {
	if(look.look_images.length == 0) {
		return null;
	}
	return look.look_images[0].image;
}