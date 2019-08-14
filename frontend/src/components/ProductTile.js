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
            marginRight: "5px",
        };
        const mediaBoxStyle = {
        	width: "100%",
        }
        const titleStyle = {
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "100%",
            marginBottom: "0",
        }
        const priceStyle = {
        	textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "120px",
            marginBottom: "0",
            display:"flex",
            alignItems:"center",
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
        itemStyle.backgroundColor = this.props.isHighlighted ? "white" : "#F8F8F8";
        if (this.props.isHighlighted) {
            itemStyle.marginTop = "-2px";
            itemStyle.boxShadow = "5px 5px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)";
        }
		return (
			<div style={itemStyle} onClick={this.props.clickHandler}>
                    <div className="media" style={mediaBoxStyle}>
                    	{// TODO: Dynamic render when we have image
                    	/*                        <div className="media-left" >
                            <img style={imageStyle} src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
                        </div>*/}

                        <div className="media-content" style={contentStyle}>
                            <div className="title is-6" style={titleStyle}>{product.title}</div>
                            <div style={{display:"flex"}}>
                                <div className="subtitle is-6" style={priceStyle}>{product.price}</div>
                                {this.props.isHighlighted ?
                                    <a href={linkUrl}><div className="button is-info is-outlined" style={{height:"25px"}}>Shop</div></a>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div>
            </div>
		)
	}

}

export default ProductTile