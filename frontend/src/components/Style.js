import React from "react";
import PropTypes from "prop-types";
import SocialPlugin from "./SocialPlugin";

const Style = ({ style }) => {
    const imageStyle = {
        width: "100%",
        borderRadius: "5px"
    };
    const timeStyle = {
        fontWeight: "normal",
        color: "#A9A9A9",
        margin: "0 24px"
    };
    const carouselStyle = {
        overflowY: "hidden",
        width: "100%",
        position: "relative",
        whiteSpace: "nowrap",
        overflowX: "auto",
    };
    const titleStyle = {
        overflowX: "initial"
    };
    const lookContainerStyle = {
        maxWidth: "960px",
    }
    const socialPluginStyle = {
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 10px 10px 10px",
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
                    <div className="card">
                        <img className="is-block container" style={imageStyle} src={style.style_images && style.style_images[0].image}></img>
                        <div className="container" style={carouselStyle}>
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
                        <div className="" style={socialPluginStyle}>
                            <SocialPlugin />
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="card">
                        <div className="column is-hidden-mobile">
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
                        <div className="container" style={timeStyle}>
                            <time>{style.publish_date}</time>
                            <div className="is-pulled-right">
                                {/*
                                <span className="icon ">
                                    <i className="fas fa-heart"></i>
                                </span>
                                */}
                                <span className="icon">
                                    <i className="fas fa-share"></i>
                                </span>
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                {style.description}
                            </div>
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