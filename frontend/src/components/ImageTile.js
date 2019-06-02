import React from "react";
import PropTypes from "prop-types";

const ImageTile = ({ source }) => {
    const imageStyle = {
        borderRadius: "5px"
    };

    return (
        <div className="">
            <img style={imageStyle} src={source}></img>
        </div>
    );
};
ImageTile.propTypes = {
    source: PropTypes.object.isRequired
};
export default ImageTile;