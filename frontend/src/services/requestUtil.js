import { userUtil } from './userUtil';

export const requestUtil = {
	getUnAuthorizedHeader,
	getAuthorizedHeader,
	getDynamicHeader,

	getAuthorizedHeaderForFile,
};

function getUnAuthorizedHeader() {
	return {
		'Accept': 'application/json',
        'Content-Type': 'application/json',
	}
}

function getAuthorizedHeader() {
	return {
		'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ userUtil.getToken(),
	}
}

function getDynamicHeader() {
	return userUtil.isLoggedIn() ? getAuthorizedHeader() : getUnAuthorizedHeader();
}

function getAuthorizedHeaderForFile() {
	return {
		'Accept': 'application/json',
        'Authorization': 'Token '+ userUtil.getToken(),
	}
}
