export const userService = {
	login,
	signup,
	getUserProfile,
	updateUserProfile,
	setUserAvatarImage,

	getToken,
	getProfile,
	updateCachedProfile,
	isLoggedIn,
	logout,

	getUserProfilePreview,
};

const userAPI = {
	'LOGIN' : {
		'END_POINT': 'api/users/obtain_auth_token/',
		'METHOD': 'POST',
	},
	'SIGNUP' : {
		'END_POINT': '/api/users/sign_up/',
		'METHOD': 'POST',
	},
	'GET_PROFILE_PREVIEW' : {
		'END_POINT': '/api/users/get_profile_preview/',
		'METHOD': 'POST',
	},
	'GET_PROFILE' : {
		'END_POINT': '/api/user_profile/get_profile/',
		'METHOD': 'POST',
	},
	'UPDATE_PROFILE' : {
		'END_POINT': '/api/user_profile/update_profile/',
		'METHOD': 'POST',
	},
	'SET_AVATAR_IMAGE' : {
		'END_POINT': '/api/user_profile/set_avatar_image/',
		'METHOD': 'POST',
	},
}

function getToken() {
	if (localStorage.getItem('user') == undefined) {
		return null;
	}
	const user = JSON.parse(localStorage.getItem('user'));
	return user.token;
}

function getProfile() {
	if (localStorage.getItem('user') == undefined) {
		return null;
	}
	const user = JSON.parse(localStorage.getItem('user'));
	return user.profile;
}

function isLoggedIn() {	
	return getToken() != null;
}

function logout() {
	localStorage.removeItem('user');
}

function updateCachedProfile(profile) {
	const user = JSON.parse(localStorage.getItem('user'));
	user.profile = profile;
	localStorage.setItem('user', JSON.stringify(user));
}

function getUserHeader() {
	return {
		'Accept': 'application/json',
        'Content-Type': 'application/json',
	}
}

function getUserProfileHeader() {
	return {
		'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ getToken(),
	}
}

function getUserProfileHeaderForFile() {
	return {
		'Accept': 'application/json',
        'Authorization': 'Token '+ userService.getToken(),
	}
}

function handleResponse(response) {
	return response.json().then(
		data => {
			if (response.ok) {
				localStorage.setItem('user', JSON.stringify(data));
				return data;
			} else {
				const error = Object.values(data)[0][0] || response.statusText;
				return Promise.reject(error);
			}
		});
}

function login(email, password) {
	return fetch(
		userAPI.LOGIN.END_POINT, {
            method: userAPI.LOGIN.METHOD,
            headers: getUserHeader(),
            body: JSON.stringify({
                username: email,
                password: password,
            })
        }).then(handleResponse);
}

function signup(email, password, nickname) {
	return fetch(
		userAPI.SIGNUP.END_POINT, {
			method: userAPI.LOGIN.METHOD,
			headers: getUserHeader(),
			body: JSON.stringify({
				email: email,
				password: password,
				nickname: nickname,
			})
		}).then(handleResponse);
}

function getUserProfilePreview(userId) {
	return fetch(
		userAPI.GET_PROFILE_PREVIEW.END_POINT, {
			method: userAPI.GET_PROFILE_PREVIEW.METHOD,
			headers: getUserHeader(),
			body: JSON.stringify({"user_id":userId}),
		}).then(response=> {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject("cannot retrieve your profile");
			}
		})
}

function getUserProfile() {
	return fetch(
		userAPI.GET_PROFILE.END_POINT, {
			method: userAPI.GET_PROFILE.METHOD,
			headers: getUserProfileHeader(),
		}).then(response=> {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject("cannot retrieve your profile");
			}
		})
}

function updateUserProfile(profile) {
	return fetch(
		userAPI.UPDATE_PROFILE.END_POINT, {
			method: userAPI.UPDATE_PROFILE.METHOD,
			headers: getUserProfileHeader(),
			body: JSON.stringify(profile),
		}).then(response=> {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject("try another one");
			}
		})
}


function setUserAvatarImage(file) {
	return fetch(
		userAPI.SET_AVATAR_IMAGE.END_POINT, {
			method: userAPI.SET_AVATAR_IMAGE.METHOD,
			headers: getUserProfileHeaderForFile(),
            body: file,
		})
	.then(response => {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject("cannot set profile image");
		}
	})
}


