import React from "react";
import PropTypes from "prop-types";

const Style = ({style}) => (
    <div className="columns">
        <div className="column">
            <div className="style-section" style={{paddingLeft:"15px", paddingRight:"15px"}}>
                <div className="style-container" style={{position:"relative"}}>
                    <img src={style.style_image_url} style={{borderRadius:"10px"}}></img>
                    {style.style_image_annotations && style.style_image_annotations.map(annotation => {
                        const tagStyle = {
                            display: "inline-block",
                            position: "absolute",
                            background: "white",
                            opacity: 0.2,
                            lineHeight: 1,
                            borderRadius: "10px",
                            top: annotation.coor_x + "%",
                            left: annotation.coor_y + "%",
                        };
                        return (
                            <div style={tagStyle} >
                                <a href={annotation.url}>
                                    <img src={"/static/tag.png"} style={{height:"30px"}}></img>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
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
    </div>
);
Style.propTypes = {
  style: PropTypes.object.isRequired
};
export default Style;