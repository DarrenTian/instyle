import React from "react";
import PropTypes from "prop-types";
import tag from "../../assets/tag.png"

const Style = ({style}) => (
    <div className="columns">
        <div className="column is-hidden-mobile"></div>
        <div className="column">
            <img src={style.style_image_url}></img>
            {style.style_image_annotations && style.style_image_annotations.map(annotation => {
                const tagStyle = {
                    display: "inline-block",
                    position: "absolute",
                    background: "white",
                    opacity: 0.2,
                    lineHeight: 1,
                    borderRadius: "10px",
                    top: annotation.coor_x,
                    left: annotation.coor_y
                };
                return (
                    <div style={tagStyle} >
                        <a href='{{ annotation.url }}'><img src={tag} height={30}></img></a>
                    </div>
                );
            })}
        </div>
        <div className="card-content column">
            <div className="media">
                <div className="media-content">
                    <p className="title">{style.title}</p>
                    <p className="subtitle"><a href={style.credit_link}>{style.credit}</a></p>
                </div>
            </div>
            <div className="content">
                {style.description}
                <br></br>
                <time>{style.publish_date}</time>
            </div>
        </div>
        <div className="column is-hidden-mobile"></div>
    </div>
);
Style.propTypes = {
  style: PropTypes.object.isRequired
};
export default Style;