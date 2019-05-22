import ImageTile from "./ImageTile";
import Invite from "./Invite";
import React from "react";
import PropTypes from "prop-types";

const Welcome = () => {
    return (
        <div>
            <div className="tiles-section-wrapper">
                <div className="overlay"></div>
                <section className="section tiles-section">
                        <div className="tiles-vertical-columns">
                            <ImageTile source={"./static/looks/addict.attitude/1.jpg"}/>
                            <ImageTile source={"./static/looks/addict.attitude/4.jpg"}/>
                            <ImageTile source={"./static/looks/addict.attitude/2.jpg"}/>    
                            <ImageTile source={"./static/looks/addict.attitude/5.jpg"}/>
                            <ImageTile source={"./static/looks/addict.attitude/7.jpg"}/>
                            <ImageTile source={"./static/looks/addict.attitude/8.jpg"}/>
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