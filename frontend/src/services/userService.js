export const userService = {
	login,
	signup,
	getUserProfile,

	getToken,
	isLoggedIn,
	logout,
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
	'GET_PROFILE' : {
		'END_POINT': '/api/user_profile/get_profile/',
		'METHOD': 'POST',
	},
	'UPDATE_PROFILE' : {
		'END_POINT': '/api/user_profile/update_profile/',
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

function isLoggedIn() {	
	return getToken() != null;
}

function logout() {
	localStorage.removeItem('user');
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


