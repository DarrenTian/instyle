import React from "react";
import ProductTile from "./ProductTile";
import PropTypes from "prop-types";
import Slider from "react-slick";

import { lookUtil } from "../services";

class ProductCarousel extends React.Component {
	constructor(props) {
        super(props);
        this.carousel = React.createRef();
    }
	componentDidUpdate() {
		// Smooth the effect
		const index = this.props.view.selectedTag.index;
		const left = index > -1 ? (index * 210) : 0;
		this.carousel.current.scrollLeft = left;
    }
	render() {
		// TODO: Extend this to support mutiple images.
		const tags = lookUtil.getTags(this.props.look);
		const sliderSettings = {
	      infinite: true,
	      speed: 500,
	      slidesToShow: 2,
	      slidesToScroll: 1
	    };
	    const staticCarouselStyle = {
	    	display: "flex",
	    	overflowX: "auto",
	    	scrollBehavior: "smooth",
	    }
	    const productContainerStyle = {
	    	margin: "2px",
	    }

		return (
			<div style={staticCarouselStyle} className="product-carousel" ref={this.carousel}>
                 {tags && tags.map((tag, index) => {
                    return (
                    	<div key={index} style={productContainerStyle}>
                    		<ProductTile product={tag.product} index={index} isLinked={true} isHighlighted={index==this.props.view.selectedTag.index} />
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