import React from "react";
import ProductCarousel from "./ProductCarousel"
import PropTypes from "prop-types";
import SocialPlugin from "./SocialPlugin";

const Style = ({ style }) => {
    const imageStyle = {
        width: "100%",
        borderRadius: "5px",
    };
    const timeStyle = {
        fontWeight: "normal",
        color: "#A9A9A9",
        display: "flex",
        justifyContent: "flex-end",

    };
    const titleStyle = {
        overflowX: "initial",
        alignSelf: "center",
    };
    const lookContainerStyle = {
        maxWidth: "960px",
    }
    const socialPluginStyle = {
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 10px 10px 10px",
    }
    const productCarouselStyle = {
        padding: "10px 10px 10px 10px",
    }
    const lookCardStyle = {
        borderRadius: "5px",
    }
    const publisherCardStyle = {
        borderRadius: "5px",
        padding: "15px 15px 15px 15px",
    }
    return (
        <div>
        <div className="section columns is-centered">
            <div className="columns container is-centered is-widescreen" style={lookContainerStyle}>
                <div className="column is-hidden-tablet is-hidden-desktop">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src="/static/avatar.png" alt="Placeholder image"></img>
                            </figure>
                        </div>
                        <div className="media-content" style={titleStyle}>
                            <p className="title is-5">{style.publisher.username}</p>
                            {/*<p className="subtitle is-6"><a href={style.credit_link}>{style.credit}</a></p>*/}
                        </div>
                        {/*<a className="button is-pulled-right">+ Follow</a>*/}
                    </div>
                </div>
                <div className="column is-6">
                    <div className="card" style={lookCardStyle}>
                        <img className="is-block container" style={imageStyle} src={style.style_images && style.style_images[0].image}></img>
                        <div style={productCarouselStyle}>
                            <ProductCarousel style={style}/>
                        </div>
                        <div className="" style={socialPluginStyle}>
                            <SocialPlugin />
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="card" style={publisherCardStyle}>
                        <div className="is-hidden-mobile">
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image is-48x48">
                                        <img className="is-rounded" src="/static/avatar.png" alt="Placeholder image"></img>
                                    </figure>
                                </div>
                                <div className="media-content" style={titleStyle}>
                                    <p className="title is-5">{style.publisher.username}</p>
                                    {/*<p className="subtitle is-6"><a href={style.credit_link}>{style.credit}</a></p>*/}
                                </div>
                                {/*<a className="button is-pulled-right">+ Follow</a>*/}
                            </div>
                        </div>
                        <hr></hr>
                        <div>
                            <div>
                                {style.description}
                            </div>
                        </div>
                         <div style={timeStyle}>
                            <div>{style.publish_date}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div><pre>{JSON.stringify(style, null, 2)}</pre></div>
        </div>
    );
};
Style.propTypes = {
    style: PropTypes.object.isRequired
};
export default Style;