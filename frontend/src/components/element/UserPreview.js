import React from "react";
import PropTypes from "prop-types";

import { lookUtil } from "services";
import { userService, socialService } from "services";
import Like from "components/social/Like";

class UserPreview extends React.Component {
    render() {
        const titleStyle = {
            overflowX: "initial",
            alignSelf: "center",
        };
        const avatarStyle = {
            objectFit: "cover",
            width: "100%",
            height: "100%",
        }
        return (
            <a href={"/users/"+this.props.user.nickname}>
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img className="is-rounded is-thin-border" src={this.props.user.avatar_image_thumbnail} style={avatarStyle}></img>
                        </figure>
                    </div>
                    <div className="media-content" style={titleStyle}>
                        <p className="title is-6">{this.props.user.nickname}</p>
                        {/*<p className="subtitle is-6"><a href={style.credit_link}>{style.credit}</a></p>*/}
                    </div>
                    {/*<a className="button is-pulled-right">+ Follow</a>*/}
                </div>
            </a>
        )
    }
}

class UserPreviewFooter extends React.Component {
    render() {
        const titleStyle = {
            alignSelf: "center",
            wordBreak: "unset",
            textOverflow: "ellipsis",
            overflow: "hidden",
        };
        const avatarStyle = {
            objectFit: "cover",
            height:"30px",
            width:"30px",
        }
        const footerContainer = {
            display: "flex",
            padding:"5px 7px",
            alignItems:"flex-start",
            justifyContent:"space-between",
        }
        return (
            <div style={footerContainer}>
                <a href={"/users/"+this.props.user.nickname}>
                    <div className="media">
                        <div className="" style={{marginRight:"5px"}}>
                            <figure className="image">
                                <img className="is-rounded is-thin-border" onError={(e)=>{lookUtil.onImageError(e)}} src={this.props.user.avatar_image_thumbnail} style={avatarStyle}></img>
                            </figure>
                        </div>
                        <div className="title is-7" style={titleStyle}>
                            {this.props.user.nickname}
                        </div>
                    </div>
                </a>
                <Like {...this.props} look={this.props.look}/>
            </div>
        )
    }
}

class UserProfilePreview extends React.Component {
    state = {
        profile: {},
    };

    componentDidMount() {
        userService.getUserProfilePreview(this.props.userId)
            .then(user=>{
                this.setState({ profile: user.profile });
            })
    }

    render() {
        const titleStyle = {
            overflowX: "initial",
            alignSelf: "center",
        };
        const avatarStyle = {
            objectFit: "cover",
            width: "100%",
            height: "100%",
        }
        return (
            <div className="media">
                <div className="media-left">
                    <figure className="image is-128x128">
                        <img className="is-rounded is-thin-border" src={this.state.profile.avatar_image_thumbnail} style={avatarStyle}></img>
                    </figure>
                </div>
                <div className="media-content" style={titleStyle}>
                    <p className="title is-5">{this.state.profile.nickname}</p>
                    <p className="is-5">{this.state.profile.biography}</p>
                    {/*<p className="subtitle is-6"><a href={style.credit_link}>{style.credit}</a></p>*/}
                </div>
                {/*<a className="button is-pulled-right">+ Follow</a>*/}
            </div>
        )
    }
}

export {
    UserPreview,
    UserPreviewFooter,
    UserProfilePreview,
}
