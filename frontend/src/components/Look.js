import React from "react";
import PropTypes from "prop-types";

import MediaQuery from 'react-responsive';
import ProductCarousel from "./ProductCarousel"
import SocialPlugin from "./SocialPlugin";
import { lookUtil } from "../services";

const UserPreview = ({ user }) => {
    const titleStyle = {
        overflowX: "initial",
        alignSelf: "center",
    };
    const avatarStyle = {
        objectFit: "cover",
        width: "100%",
        height: "100%",
        boxShadow: "0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)",
    }
    return (
        <div className="media">
            <div className="media-left">
                <figure className="image is-48x48">
                    <img className="is-rounded" src={user.avatar_image} style={avatarStyle} alt="Placeholder image"></img>
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

const LookDesktop = ({look}) => {
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
    const coverImage = lookUtil.getCoverImage(look);
    return (
        <React.Fragment>
            <div className="column is-6">
                <div className="card" style={lookCardStyle}>
                    <img className="is-block container" style={imageStyle} src={coverImage}></img>
                    <div style={productCarouselStyle}>
                        <ProductCarousel look={look}/>
                    </div>
                    <div className="" style={socialPluginStyle}>
                        <SocialPlugin />
                    </div>
                </div>
            </div>
            <div className="column is-4">
                <div className="card" style={publisherCardStyle}>
                    <div>
                        <UserPreview user={look.publisher}/>
                    </div>
                    <hr></hr>
                    <div>
                        <div>
                            {look.description}
                        </div>
                    </div>
                     <div style={timeStyle}>
                        <div>{look.publish_date}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
} 

const LookMobile = ({ look }) => {
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
    const coverImage = lookUtil.getCoverImage(look);
    return (
        <React.Fragment>
            <div className="column">
                <UserPreview user={look.publisher}/>
            </div>
            <div className="column is-6">
                <div className="card is-shadowless" style={lookCardStyle}>
                    <img className="is-block container" style={imageStyle} src={coverImage}></img>
                    <div style={productCarouselStyle}>
                        <ProductCarousel look={look}/>
                    </div>
                    <div className="" style={socialPluginStyle}>
                        <SocialPlugin />
                    </div>
                </div>
            </div>
            <div className="column is-4">
                <div className="card is-shadowless" style={publisherCardStyle}>
                    <div className="is-hidden-mobile">
                        <UserPreview user={look.publisher}/>
                    </div>
                    <hr className="is-hidden-mobile"></hr>
                    <div>
                        <div>
                            {look.description}
                        </div>
                    </div>
                     <div style={timeStyle}>
                        <div>{look.publish_date}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

class Look extends React.Component {
    render() {
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
                        {/* TODO, make format better
                        this.props.preview && <div className="section is-size-5 has-text-info">Preview</div>*/}
                        <MediaQuery query="(min-width: 769px)">
                            <LookDesktop look={this.props.look} />
                        </MediaQuery>
                        <MediaQuery query="(max-width: 769px)">
                            <LookMobile look={this.props.look} />
                        </MediaQuery>
                    </div>
                </div>
                { process.env.PROD_ENV == "DEV" && <div><pre>{JSON.stringify(this.props.look, null, 2)}</pre></div> }            
            </div>
        )
    }

};
export default Look;