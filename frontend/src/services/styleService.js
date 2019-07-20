import { userService } from './userService'

export const styleService = {
	getMyStyles,
	createMyStyle,
	removeMyStyle,
	updateMyStyle,
	uploadMyStyleImage,

	getStyle,
	styleModelToData,
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
		})
		.then(styles => {
			let looks = [];
			styles.map(style => {
				looks.push(styleModelToPreviewData(style))
			})
			console.log(looks);
			return looks;
		});
}

function createMyStyle() {
	return fetch(
		'/api/styles/', {
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

function removeMyStyle(lookId) {
	return fetch(
		'/api/styles/' + lookId + '/', {
	        method: 'DELETE',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	            'Authorization': 'Token '+ userService.getToken(),
	        },
    })
	.then(response => {
		if (response.status != 204) {
			return Promise.reject("cannot remove style");
		}
	});
}

function updateMyStyle(lookId, look) {
	return fetch(
		'/api/styles/'+ lookId + '/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token '+ userService.getToken(),
            },
            body: JSON.stringify(look),
        })
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject("cannot update style");
			}
		})
}

function uploadMyStyleImage(lookId, file) {
	console.log('lookId' + lookId + 'with file' + file);
	return fetch(
		'/api/styles/' + lookId + '/set_image/', {
			method: 'POST',
			headers: {
                'Accept': 'application/json',
                'Authorization': 'Token '+ userService.getToken(),
            },
            body: file,
		})
	.then(response => {
		console.log(response);
	})
}

function getStyle(styleId) {
	return fetch("/api/styles/" + styleId + "/?format=json")
      .then(response => {
      	if (response.ok) {
      		return response.json();
      	} else {
      		return Promise.reject("cannot get style");
      	}
      })
}

function getCoverImage(style) {
	if(style.style_images.length == 0) {
		return null;
	}
	return style.style_images[0];
}

function styleModelToPreviewData(style) {
	let look = {};
	look.id = style.id;
	look.isPublished = (style.publish_status == "P");
	look.description = style.description;
	let image = getCoverImage(style)
	if (image) {
		look.image = image.image;
		look.imageId = image.id;
	}
	return look;
}

// Temporarily translate style model to presentation data before data model is finalized.
// {
//   "description": "Sometimes you gotta close a door to open a window ",
//   "image": "http://127.0.0.1:8000/media/addict.attitude/8_Gmaz9JY.jpg",
//   "tags": [
//     {
//       "coor_x": 0,
//       "coor_y": 0,
//       "product": {
//         "url": "https://addict-attitude.myshopify.com/products/addict-attitude-s-s19-6-ripped-hoody-preorder",
//         "title": "S/S 19 #6 RIPPED HOODY",
//         "price": "$166.00"
//       }
//     }
//   ]
// }
function styleModelToData(style) {
	let look = styleModelToPreviewData(style);
	look.selectedTag = {
		hasSelected: false,
		index: -1,
	};
	look.isChanged = false;

	look.tags = [];
	let image = getCoverImage(style);
	if (image) {
		image.style_image_annotations.map(annotation => {
			let tag = {}
			tag.id = annotation.id;
			tag.coor_x = annotation.coor_x;
			tag.coor_y = annotation.coor_y;
			let product = {};
			product.url = annotation.url;
			product.title = annotation.title;
			product.price = annotation.price;
			tag.product = product;
			look.tags.push(tag);
		})
	}

	return look;
}