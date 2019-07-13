import React from "react";
import PropTypes from "prop-types";

class ProductTile extends React.Component {
	render() {
		const itemStyle = {
			backgroundColor: "white",
			boxShadow: "0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)",
            width: "210px",
            borderRadius: "5px",
            backgroundColor: "#F8F8F8",
            height: "70px",
            marginRight: "10px",
        };
        const mediaBoxStyle = {
        	width: "100%",
        }
        const titleStyle = {
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "100%",
        }
        const priceStyle = {
        	textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "120px",
        }
        const imageStyle = {
        	height: "70px",
        	borderRadius: "5px",
        }
        const contentStyle = {
        	height: "70px",
        	display: "flex",
        	flexDirection: "column",
        	justifyContent: "space-between",
        	padding: "10px 10px 10px 10px",
        	width:"100%"
        }	
        const product = this.props.product;
        const islinked = this.props.isLinked ? true : false;
        const linkUrl = islinked ? product.url : null;
        const hasImage = this.props.product.image_url == "";
		return (
			<div style={itemStyle} onClick={this.props.clickHandler}>
                <a href={linkUrl}>
                    <div className="media" style={mediaBoxStyle}>
                    	{// TODO: Dynamic render when we have image
                    	/*                        <div className="media-left" >
                            <img style={imageStyle} src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
                        </div>*/}

                        <div className="media-content" style={contentStyle}>
                            <div className="title is-6" style={titleStyle}>{product.title}</div>
                            <div className="subtitle is-6" style={priceStyle}>{product.price}</div>
                        </div>
                    </div>
                </a>
            </div>
		)
	}

}

export default ProductTile