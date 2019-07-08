import { userService } from './userService'

export const styleService = {
	getMyStyles,
	createMyStyle,
	getStyle,
	styleModelToData,
};

function getStyle(styleId) {
	return fetch("/api/styles/" + styleId + "/?format=json")
      .then(response => {
        return response.json();
      })
}

function updateStyle(style) {
	// TODO, here is the main function to update style based on frontend operation.
	// As of now, log the modifed style for frontend development.
	console.log(style);
}

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
	let look = {};
	look.isPublished = false;
	look.description = style.description;
	look.image = style.style_images[0].image;
	look.selectedTag = {
		hasSelected: false,
		index: -1,
	};
	look.tags = [];
	style.style_images[0].style_image_annotations.map(annotation => {
		let tag = {}
		tag.coor_x = annotation.coor_x;
		tag.coor_y = annotation.coor_y;
		let product = {};
		product.url = annotation.url;
		product.title = annotation.title;
		product.price = annotation.price;
		tag.product = product;
		look.tags.push(tag);
	})
	console.log(look);
	return look;
}