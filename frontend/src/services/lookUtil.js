export const lookUtil = {
	onImageError,
	getCoverLookImage,
	getCoverImage,
	getTags,
	getPublisher,
};

function onImageError(e) {
	e.target.src="/static/logo_transparent.png";
}

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

function getPublisher(looks) {
	if (!looks) {
    	return null;
    }

    if (looks.length == 0) {
        return null;
    }

    return looks[0].publisher;
}

