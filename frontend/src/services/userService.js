export const userService = {
	login,
	signup,

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
	}
}

function getUserHeader() {
	return {
		'Accept': 'application/json',
        'Content-Type': 'application/json',
	}
}

function getToken() {
	return localStorage.getItem('userAuthToken')
}

function isLoggedIn() {
	return localStorage.getItem('userAuthToken') != undefined;
}

function handleResponse(response) {
	return response.json().then(
		data => {
			if (response.ok) {
				localStorage.setItem("userAuthToken", data.token);
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

function logout() {
	localStorage.removeItem('userAuthToken');
}
