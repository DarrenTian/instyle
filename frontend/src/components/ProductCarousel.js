import React from "react";
import PropTypes from "prop-types";

class ProductCarousel extends React.Component {
	render() {
		const style = this.props.style;
		console.log(style);
		return (
			<div>
			                  {style.style_images && style.style_images[0].style_image_annotations.map((annotation, key) => {
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
                                    <a key={key} style={itemStyle} href={annotation.url}>
                                        <div className="media" >
                                            {/*
                                            <div className="media-left">
                                                <figure className="image is-48x48">
                                                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img>
                                                </figure>
                                            </div>
                                            */}
                                            <div className="media-content">
                                                <p className="title is-6" style={titleStyle}>{annotation.title}</p>
                                                <p className="subtitle is-6">{annotation.price}</p>
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
			                  </div>
		)

	}

}

export default ProductCarousel