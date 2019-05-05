import Invite from "./Invite";
import React from "react";
import PropTypes from "prop-types";

const Welcome = () => {
    const introStyle = {
        textAlign: "center",
        height: "400px",
        paddingTop: "150px",
        backgroundColor: "#00d1b2",
        fontSize: "35px",
        color: "white",
        marginBottom: "20px",
    };
    return (
        <div>
            <div style={introStyle} className="introduction column is-full-desktop">
                Styler is the ultimate destination for Stylers.
        </div>
            <Invite />
        </div>
    )
};
Welcome.propTypes = {
    Welcome: PropTypes.object.isRequired
};
export default Welcome;