import React from "react";
import PropTypes from "prop-types";

import { lookUtil } from "../services";
import { socialService } from "../services";

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
        )
    }
}

class UserPreviewFooter extends React.Component {
    state = {
        liked: false,
    };

    like = ()=>{
        socialService.like("OMkn5vfm")
          .then(response =>{
            console.log("success");
        }
          )
          .catch(e => {
            console.log("fail");
          });
        this.setState({liked:!this.state.liked});
    }
    render() {
        const titleStyle = {
            alignSelf: "center",
            maxWidth: "80px",
            wordBreak: "unset",
            textOverflow: "ellipsis",
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
        const loveStyle = {
            fontSize: "25px",
            marginTop: "-4px",
            display: "block",
        }
        const lovedStyle = {
            fontSize: "25px",
            marginTop: "-4px",
            display: "none",
            color: "#F04857",
        }
        if (this.state.liked) {
            lovedStyle.display = "block";
            loveStyle.display = "none";
        } else {
            lovedStyle.display = "none";
            loveStyle.display = "block";      
        }
        return (
            <div style={footerContainer}>
                <div>
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
                </div>
            {/*

                <div style={loveStyle} className="is-clickable" onClick={this.like}>
                    <i class="far fa-heart"></i>
                </div>
                <div style={lovedStyle} className="is-clickable" onClick={this.like}>
                    <i class="fas fa-heart"></i>
                </div>
                 */}

            </div>

        )
    }
}

export {
    UserPreview,
    UserPreviewFooter,
}
