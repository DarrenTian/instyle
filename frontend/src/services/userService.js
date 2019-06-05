export const userService = {
	isLoggedIn,
	logout,
};

function isLoggedIn() {
	return localStorage.getItem('userAuthToken');
}

function logout() {
	localStorage.removeItem('userAuthToken');
}
