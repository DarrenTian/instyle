export const lookUtil = {
	getCoverLookImage,
	getCoverImage,
	getTags,
};

function getCoverLookImage(look) {
	if(!look.look_images) {
		return null;
	}

	if(look.look_images.length == 0) {
		return null;
	}
	return look.look_images[0];
}

function getCoverImage(look) {
	return getCoverLookImage(look) ? look.look_images[0].image : null;
}

function getTags(look) {
	const lookImage = getCoverLookImage(look);
	return lookImage ? lookImage.tags : null;
}

