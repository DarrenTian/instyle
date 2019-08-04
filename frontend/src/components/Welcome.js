import ImageTile from "./ImageTile";
import Invite from "./Invite";
import React from "react";
import PropTypes from "prop-types";

const getImageSrc = (imagePath) => {
    const imagePrefix = 'https://eastyler-static.s3.amazonaws.com/media/';
    return imagePrefix + imagePath;
}

const Welcome = () => {
    const mainSectionStyle = {
      backgroundImage: "url(./static/main-section-bg.png)",
      backgroundRepeat: "round repeat",
      marginTop: "1px",
      paddingTop: "100px",
      paddingBottom: "150px",
    }
    const titleStyle = {
        fontFamily: "Quando",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: "2.5",
    }
    const homeContainerStyle = {
        maxWidth: "960px",
    }
    const reverseColumnStyle = {
        flexDirection: "row-reverse",
    }
    return (
        <div>
            <section className="section" style={mainSectionStyle}>
                <div className="container">
                    <div className="columns">
                        <div className="column is-8 is-offset-2 has-text-centered">
                            <h1 className="title big-title text-bold is-2" style={titleStyle}>
                                Eastyler
                            </h1>
                            <div className="subtitle light-subtitle">
                                Create interactive shoppable looks to reach your audience.
                                <br/>
                                Built for Bloggers, YouTuber and Influencers.
                            </div>
                             <div>
                                <Invite />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container" style={homeContainerStyle}>
                    <div className="columns is-vcentered" >
                        <div className="column is-4 is-offset-1">
                            <div className="minimal-feature">
                                <h2 className="title is-5 minimal-title">Tag</h2>
                                <p className="feature-content">
                                    Upload your favorite looks and tag products. 
                                    <br/>
                                    The interactive tags allow your audience to visually explore your looks with convenience.
                                </p>
                            </div>
                        </div>
                        <div className="column is-6 is-offset-1">
                            <div className="minimal-feature-image">

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container" style={homeContainerStyle}>
                    <div className="columns is-vcentered" style={reverseColumnStyle}>
                        <div className="column is-4 is-offset-1">
                            <div className="minimal-feature">
                                <h2 className="title is-5 minimal-title">Share</h2>
                                <p className="feature-content">
                                    Embedded social plugins help you to spread your influence across major social networks.
                                </p>
                            </div>
                        </div>
                        <div className="column is-6 is-offset-1">
                            <div className="minimal-feature-image">
                                <img className="main-image" src="./static/share_feature.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="tiles-section-wrapper">
                <div className="overlay"></div>
                <section className="section tiles-section">
                        <div className="tiles-vertical-columns">
                            <ImageTile source={getImageSrc('fangzheng/1.jpg')}/>
                            <ImageTile source={getImageSrc('addict.attitude/1.jpg')}/>
                            <ImageTile source={getImageSrc('addict.attitude/2.jpg')}/>    
                            <ImageTile source={getImageSrc('fangzheng/2.jpg')}/>
                            <ImageTile source={getImageSrc('addict.attitude/7.jpg')}/>
                            <ImageTile source={getImageSrc('addict.attitude/8.jpg')}/>
                        </div>
                </section>
            </div>

        </div>
    )
};
Welcome.propTypes = {
};
export default Welcome;