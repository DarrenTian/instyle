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
            display: "inline-block",
            height: "70px",
            marginRight: "10px",
        };
        const titleStyle = {
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
        	padding: "10px 0 10px 0",
        }
        const product = this.props.product
		return (
			<div style={itemStyle}>
                <a href={product.url}>
                    <div className="media" >
                        <div className="media-left" >
                            <img style={imageStyle} src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
                        </div>
                        <div className="media-content" style={contentStyle}>
                            <p className="title is-6" style={titleStyle}>{product.title}</p>
                            <p className="subtitle is-6">{product.price}</p>
                        </div>
                    </div>
                </a>
            </div>
		)
	}

}

export default ProductTile