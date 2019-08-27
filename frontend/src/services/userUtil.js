export const userUtil = {
	getToken,
	getProfile,
	updateCachedProfile,
	isLoggedIn,
	isSelf,
	logout,
};

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

function updateCachedProfile(profile) {
	const user = JSON.parse(localStorage.getItem('user'));
	user.profile = profile;
	localStorage.setItem('user', JSON.stringify(user));
}

function isLoggedIn() {	
	return getToken() != null;
}

function isSelf(userId) {
	if (getProfile() == null) { return false; }
	return getProfile().nickname == userId;
}

function logout() {
	localStorage.removeItem('user');
}