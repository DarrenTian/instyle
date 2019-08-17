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
    }
    return (
        <div className="media">
            <div className="media-left">
                <figure className="image is-48x48">
                    <img className="is-rounded is-thin-border" src={user.avatar_image} style={avatarStyle} alt="Placeholder image"></img>
                </figure>
            </div>
            <div className="media-content" style={titleStyle}>
                <p className="title is-6">{user.nickname}</p>
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
        const tagWidth = 26;
        const dotWidth = 10;
        const selectedTagWidth = 20;
        const selectedDotWidth = 16;

        const tagStyle = {
          position: "absolute",
          backgroundColor: "#363636",
          borderRadius: "50%",
          left: -tagWidth/2,
          top: -tagWidth/2,
          height: tagWidth + "px",
          width: tagWidth + "px",
        }
        const selectedTagStyle = {
          position: "absolute",
          backgroundColor: "#363636",
          borderRadius: "50%",

          left: -selectedTagWidth/2,
          top: -selectedTagWidth/2,
          height: selectedTagWidth + "px",
          width: selectedTagWidth + "px",
        }
        const dotStyle = {
          position: "absolute",
          backgroundColor: "white",
          borderRadius: "50%",
          left: -dotWidth/2,
          top: -dotWidth/2,
          height: dotWidth + "px",
          width:  dotWidth + "px",
        }
        const selectedDotStyle = {
          position: "absolute",
          backgroundColor: "white",
          borderRadius: "50%",
          left: -selectedDotWidth/2,
          top: -selectedDotWidth/2,
          height: selectedDotWidth + "px",
          width: selectedDotWidth + "px",
        }
        const coverImage = lookUtil.getCoverImage(this.props.look);
        const tags = lookUtil.getTags(this.props.look);
        return (
            <React.Fragment>
                <div className="column is-6">
                    <div className="card is-shadowless is-thin-border" style={lookCardStyle}>
                        <div style={tagContainerStyle} ref={this.tagContainer}> 
                            <img className="is-block container" style={imageStyle} src={coverImage} onLoad={this.updateLook}>
                            </img>
                            {tags && tags.map((tag, index)=> {
                                const isSelected = index == this.state.view.selectedTag.index;
                                const singleTagStyle = isSelected ? {...selectedTagStyle} : {...tagStyle};
                                const singleDotStyle = isSelected ? {...selectedDotStyle} : {...dotStyle};
                                if (this.tagContainer.current) {
                                  singleTagStyle.left = singleTagStyle.left + tag.coor_x * this.tagContainer.current.clientWidth + "px";
                                  singleTagStyle.top = singleTagStyle.top + tag.coor_y * this.tagContainer.current.clientHeight + "px";
                                  singleDotStyle.left = singleDotStyle.left + tag.coor_x * this.tagContainer.current.clientWidth + "px";
                                  singleDotStyle.top = singleDotStyle.top + tag.coor_y * this.tagContainer.current.clientHeight + "px";     
                                }
                                return (
                                    <div key={index} className="is-clickable" onClick={(e)=>this.selectTag(index)}>
                                        <div className={isSelected ? "is-scale-blink" : "is-blink"} style={singleTagStyle}></div>
                                        <div className={isSelected ? "" : "is-blink"} style={singleDotStyle}></div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={productCarouselStyle}>
                            <ProductCarousel look={this.props.look} view={this.state.view} selectHandler={this.selectTag}/>
                        </div>
                        <div className="" style={socialPluginStyle}>
                            <SocialPlugin showClip={true}/>
                        </div>
                    </div>
                </div>
                <div className="column is-4">
                    <div className="card is-shadowless is-thin-border" style={publisherCardStyle}>
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
            padding: "10px 0px 10px 0px",
        }
        const productCarouselStyle = {
            padding: "10px 0px 10px 0px",
        }
        const lookCardStyle = {
            borderRadius: "5px",
        }
        const publisherCardStyle = {
            borderRadius: "5px",
        }
        const tagContainerStyle = {
            position: "relative",
        }
        const tagWidth = 26;
        const dotWidth = 10;
        const selectedTagWidth = 20;
        const selectedDotWidth = 16;

        const tagStyle = {
          position: "absolute",
          backgroundColor: "#363636",
          borderRadius: "50%",
          left: -tagWidth/2,
          top: -tagWidth/2,
          height: tagWidth + "px",
          width: tagWidth + "px",
        }
        const selectedTagStyle = {
          position: "absolute",
          backgroundColor: "#363636",
          borderRadius: "50%",

          left: -selectedTagWidth/2,
          top: -selectedTagWidth/2,
          height: selectedTagWidth + "px",
          width: selectedTagWidth + "px",
        }
        const dotStyle = {
          position: "absolute",
          backgroundColor: "white",
          borderRadius: "50%",
          left: -dotWidth/2,
          top: -dotWidth/2,
          height: dotWidth + "px",
          width:  dotWidth + "px",
        }
        const selectedDotStyle = {
          position: "absolute",
          backgroundColor: "white",
          borderRadius: "50%",
          left: -selectedDotWidth/2,
          top: -selectedDotWidth/2,
          height: selectedDotWidth + "px",
          width: selectedDotWidth + "px",
        }
        const coverImage = lookUtil.getCoverImage(this.props.look);
        const tags = lookUtil.getTags(this.props.look);
        return (
            <React.Fragment>
                <div className="column" style={{paddingBottom:"0px"}}>
                    <UserPreview user={this.props.look.publisher}/>
                </div>
                <div className="column is-6">
                    <div className="card is-shadowless" style={lookCardStyle}>
                        <div style={tagContainerStyle} ref={this.tagContainer}>
                            <img className="is-block container" style={imageStyle} src={coverImage} onLoad={this.updateLook}></img>
                            {tags && tags.map((tag, index)=> {
                                const isSelected = index == this.state.view.selectedTag.index;
                                const singleTagStyle = isSelected ? {...selectedTagStyle} : {...tagStyle};
                                const singleDotStyle = isSelected ? {...selectedDotStyle} : {...dotStyle};
                                if (this.tagContainer.current) {
                                  singleTagStyle.left = singleTagStyle.left + tag.coor_x * this.tagContainer.current.clientWidth + "px";
                                  singleTagStyle.top = singleTagStyle.top + tag.coor_y * this.tagContainer.current.clientHeight + "px";
                                  singleDotStyle.left = singleDotStyle.left + tag.coor_x * this.tagContainer.current.clientWidth + "px";
                                  singleDotStyle.top = singleDotStyle.top + tag.coor_y * this.tagContainer.current.clientHeight + "px";     
                                }
                                return (
                                    <div key={index} className="is-clickable" onClick={(e)=>this.selectTag(index)}>
                                        <div className={isSelected ? "is-scale-blink" : "is-blink"} style={singleTagStyle}></div>
                                        <div className={isSelected ? null : "is-blink"} style={singleDotStyle}></div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={productCarouselStyle}>
                            <ProductCarousel look={this.props.look} view={this.state.view} selectHandler={this.selectTag}/>
                        </div>
                        <div className="" style={socialPluginStyle}>
                            <SocialPlugin showClip={false}/>
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