import { userService } from './userService'

export const styleService = {
	getMyStyles,
	createMyStyle,
};

function getMyStyles() {
	return fetch(
		'/api/styles/from_user/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token '+ userService.getToken(),
            },
        })
		.then(response => {
			return response.json();
		});
}

function createMyStyle() {
	// Create a new style with empty content
	return Promise.resolve('42');
}