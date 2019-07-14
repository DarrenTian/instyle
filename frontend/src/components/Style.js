import React from "react";
import PropTypes from "prop-types";

import MediaQuery from 'react-responsive';
import ProductCarousel from "./ProductCarousel"
import SocialPlugin from "./SocialPlugin";

const UserPreview = ({ user }) => {
    const titleStyle = {
        overflowX: "initial",
        alignSelf: "center",
    };
    return (
        <div className="media">
            <div className="media-left">
                <figure className="image is-48x48">
                    <img className="is-rounded" src="/static/avatar.png" alt="Placeholder image"></img>
                </figure>
            </div>
            <div className="media-content" style={titleStyle}>
                <p className="title is-5">{user.nickname}</p>
                {/*<p className="subtitle is-6"><a href={style.credit_link}>{style.credit}</a></p>*/}
            </div>
            {/*<a className="button is-pulled-right">+ Follow</a>*/}
        </div>
    )
}

const StyleDesktop = ({style}) => {
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
        <React.Fragment>
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
                    <div>
                        <UserPreview user={style.publisher}/>
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
        </React.Fragment>
    );
} 

const StyleMobile = ({ style }) => {
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

    const socialPluginStyle = {
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 10px 10px 10px",
    }
    const productCarouselStyle = {
        padding: "10px 10px 10px 10px",
        overflow: "scroll",
    }
    const lookCardStyle = {
        borderRadius: "5px",
    }
    const publisherCardStyle = {
        borderRadius: "5px",
        padding: "15px 15px 15px 15px",
    }
    return (
        <React.Fragment>
            <div className="column is-6">
                <div className="card is-shadowless" style={lookCardStyle}>
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
                <div className="card is-shadowless" style={publisherCardStyle}>
                    <div className="is-hidden-mobile">
                        <UserPreview user={style.publisher}/>
                    </div>
                    <hr className="is-hidden-mobile"></hr>
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
        </React.Fragment>
    );
}

const Style = ({ style }) => {
    const sectionStyle = {
        padding: "1rem 1rem"
    }
    const lookContainerStyle = {
        maxWidth: "960px",
    }
    return (
        <div>
            <div className="section columns is-centered is-marginless" style={sectionStyle}>
                <div className="columns container is-centered is-widescreen" style={lookContainerStyle}>
                    <MediaQuery query="(min-width: 769px)">
                        <StyleDesktop style={style} />
                    </MediaQuery>
                    <MediaQuery query="(max-width: 769px)">
                        <StyleMobile style={style} />
                    </MediaQuery>
                </div>
            </div>
            <div><pre>{JSON.stringify(style, null, 2)}</pre></div>
        </div>
    )
};
Style.propTypes = {
    style: PropTypes.object.isRequired
};
export default Style;