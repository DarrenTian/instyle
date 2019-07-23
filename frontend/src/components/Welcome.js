import ImageTile from "./ImageTile";
import Invite from "./Invite";
import React from "react";
import PropTypes from "prop-types";

const getImageSrc = (imagePath) => {
    const imagePrefix = 'https://eastyler-static.s3.amazonaws.com/media/';
    return imagePrefix + imagePath;
}

const Welcome = () => {
    return (
        <div>
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
            <div>
                <Invite />
            </div>
        </div>
    )
};
Welcome.propTypes = {
};
export default Welcome;