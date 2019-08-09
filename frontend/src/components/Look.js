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

class LookDesktop extends React.Component {
    constructor(props) {
        super(props);
        this.tagContainer = React.createRef();
        this.state = {
          view : {
            selectedTag : {
              index : -1,
            },
          }
        };
    }
    componentDidMount() {
        this.forceUpdate();
    }
    updateLook = (e) => {
        this.forceUpdate();
    }
    selectTag = (index) => {
        console.log(index);
        const state = { ...this.state }
        state.view.selectedTag.index = index;
        this.setState(state);
    }
    render() {
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
        const tagContainerStyle = {
            position: "relative",
        }
        const tagStyle = {
          position: "absolute",
          backgroundColor: "gray",
          borderRadius: "50%",

          height: "20px",
          width: "20px",
        }
        const dotStyle = {
          position: "absolute",
          backgroundColor: "white",
          borderRadius: "50%",
          left: "5px",
          top: "5px",
          height: "10px",
          width: "10px",
        }
        const coverImage = lookUtil.getCoverImage(this.props.look);
        const tags = lookUtil.getTags(this.props.look);
        return (
            <React.Fragment>
                <div className="column is-6">
                    <div className="card" style={lookCardStyle}>
                        <div style={tagContainerStyle} ref={this.tagContainer}> 
                            <img className="is-block container" style={imageStyle} src={coverImage} onLoad={this.updateLook}>
                            </img>
                            {tags && tags.map((tag, index)=> {
                                const singleTagStyle = {...tagStyle};
                                if (this.tagContainer.current) {
                                  singleTagStyle.left = tag.coor_x * this.tagContainer.current.clientWidth + "px";
                                  singleTagStyle.top = tag.coor_y * this.tagContainer.current.clientHeight + "px";
                                }
                            return (
                              <div className="is-blink is-clickable" key={index} style={singleTagStyle} onClick={()=>this.selectTag(index)}>
                                <div style={dotStyle}></div>
                              </div>
                            )
                            })}
                        </div>
                        <div style={productCarouselStyle}>
                            <ProductCarousel look={this.props.look} view={this.state.view}/>
                        </div>
                        <div className="" style={socialPluginStyle}>
                            <SocialPlugin />
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="card" style={publisherCardStyle}>
                        <div>
                            <UserPreview user={this.props.look.publisher}/>
                        </div>
                        <hr></hr>
                        <div>
                            <div>
                                {this.props.look.description}
                            </div>
                        </div>
                         <div style={timeStyle}>
                            <div>{this.props.look.publish_date}</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
} 

class LookMobile extends React.Component {
    constructor(props) {
        super(props);
        this.tagContainer = React.createRef();
        this.state = {
          view : {
            selectedTag : {
              index : -1,
            },
          }
        };
    }

    updateLook = (e) => {
        this.forceUpdate();
    }
    selectTag = (index) => {
        const state = { ...this.state }
        state.view.selectedTag.index = index;
        this.setState(state);
    }

    render() {
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
        const tagContainerStyle = {
            position: "relative",
        }
        const tagStyle = {
          position: "absolute",
          backgroundColor: "gray",
          borderRadius: "50%",

          height: "20px",
          width: "20px",
        }
        const dotStyle = {
          position: "absolute",
          backgroundColor: "white",
          borderRadius: "50%",
          left: "5px",
          top: "5px",
          height: "10px",
          width: "10px",
        }
        const coverImage = lookUtil.getCoverImage(this.props.look);
        const tags = lookUtil.getTags(this.props.look);
        return (
            <React.Fragment>
                <div className="column">
                    <UserPreview user={this.props.look.publisher}/>
                </div>
                <div className="column is-6">
                    <div className="card is-shadowless" style={lookCardStyle}>
                        <div style={tagContainerStyle} ref={this.tagContainer}>
                            <img className="is-block container" style={imageStyle} src={coverImage} onLoad={this.updateLook}></img>
                            {tags && tags.map((tag, index)=> {
                                const singleTagStyle = {...tagStyle};
                                if (this.tagContainer.current) {
                                  singleTagStyle.left = tag.coor_x * this.tagContainer.current.clientWidth + "px";
                                  singleTagStyle.top = tag.coor_y * this.tagContainer.current.clientHeight + "px";
                                }
                                return (
                                  <div className="is-blink is-clickable" key={index} style={singleTagStyle} onClick={(e)=>this.selectTag(index)}>
                                    <div style={dotStyle}></div>
                                  </div>
                                )
                            })}
                        </div>
                        <div style={productCarouselStyle}>
                            <ProductCarousel look={this.props.look} view={this.state.view}/>
                        </div>
                        <div className="" style={socialPluginStyle}>
                            <SocialPlugin />
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="card is-shadowless" style={publisherCardStyle}>
                        <div className="is-hidden-mobile">
                            <UserPreview user={this.props.look.publisher}/>
                        </div>
                        <hr className="is-hidden-mobile"></hr>
                        <div>
                            <div>
                                {this.props.look.description}
                            </div>
                        </div>
                         <div style={timeStyle}>
                            <div>{this.props.look.publish_date}</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
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