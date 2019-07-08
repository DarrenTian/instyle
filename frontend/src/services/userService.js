export const userService = {
	getToken,
	isLoggedIn,
	login,
	logout,
};

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

function login(username, password) {
	return fetch(
		'/api/obtain_auth_token/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: username,
                password: password,
            })
        }).then(handleResponse);
}

function logout() {
	localStorage.removeItem('userAuthToken');
}
