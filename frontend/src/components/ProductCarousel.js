import React from "react";
import ProductTile from "./ProductTile";
import PropTypes from "prop-types";
import Slider from "react-slick";

class ProductCarousel extends React.Component {
	render() {
		// TODO: Extend this to support mutiple images.
		const products = this.props.style.style_images[0].style_image_annotations;
		const sliderSettings = {
	      infinite: true,
	      speed: 500,
	      slidesToShow: 2,
	      slidesToScroll: 1
	    };
	    const staticCarouselStyle = {
	    	display: "flex",
	    }
		return (
			<div style={staticCarouselStyle}>
                 {products && products.map((product, index) => {
                    return (
                    	<div key={index}>
                    		<ProductTile product={product} index={index} />
                    	</div>
                    );
                })}

			{
			// User Slider dynamically, e.g, when item is bigger than 3, otherwise difficult to config.
			/* 
				 <Slider {...sliderSettings}>
	                 {products && products.map((annotation, key) => {
	                    const itemStyle = {
	                        width: "150px",
	                        borderRadius: "10px",
	                        backgroundColor: "#F8F8F8",
	                        display: "inline-block",
	                        margin: "20px 8px 0 0",
	                        padding: "8px"
	                    };
	                    const titleStyle = {
	                        width: "66px",
	                        textOverflow: "ellipsis",
	                        whiteSpace: "nowrap",
	                        overflow: "hidden"
	                    }
	                    return (
	                    	<div key={key}>
		                        <a  style={itemStyle} href={annotation.url}>
		                            <div className="media" >
		                                <div className="media-left">
		                                    <figure className="image is-48x48">
		                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
		                                    </figure>
		                                </div>
		                                <div className="media-content">
		                                    <p className="title is-6" style={titleStyle}>{annotation.title}</p>
		                                    <p className="subtitle is-6">{annotation.price}</p>
		                                </div>
		                            </div>
		                        </a>
	                        </div>
	                    );
	                })}
			      </Slider>
			 */}

			 </div>
		)

	}

}

export default ProductCarousel