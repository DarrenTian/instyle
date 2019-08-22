import React from "react";
import PropTypes from "prop-types";

import MediaQuery from 'react-responsive';
import ProductCarousel from "./ProductCarousel"
import SocialPlugin from "./SocialPlugin";
import { UserPreview } from "./UserPreview";
import { lookUtil } from "../services";
import LookImage from "./LookImage";

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
        const state = { ...this.state }
        state.view.selectedTag.index = index;
        this.setState(state);
    }
    render() {
        const imageStyle = {
            width: "100%",
            borderRadius: "5px 5px 0 0",
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
                    <div className="card is-shadowless is-thin-border" style={lookCardStyle}>
                        <LookImage look={this.props.look}  isInteractive={true}  showTags={true} view={this.state.view} selectTag={this.selectTag}/>
                        <div style={productCarouselStyle}>
                            <ProductCarousel look={this.props.look}  view={this.state.view} selectHandler={this.selectTag}/>
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
            borderRadius: "5px 5px 0 0",
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
        return (
            <React.Fragment>
                <div className="column" style={{paddingBottom:"0px"}}>
                    <UserPreview user={this.props.look.publisher}/>
                </div>
                <div className="column is-6">
                    <div className="card is-shadowless" style={lookCardStyle}>
                        <LookImage look={this.props.look}  isInteractive={true} view={this.state.view} selectTag={this.selectTag} showTags={true} />
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