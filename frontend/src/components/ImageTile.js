import React from "react";
import PropTypes from "prop-types";

import { lookUtil } from "../services";

const ImageTile = ({ look }) => {
    const imageStyle = {
        borderRadius: "5px"
    };
    const coverLookImage = lookUtil.getCoverLookImage(look);
    return (
        <div>
            <a href={"./"+look.url_id}>
                <img className="is-thin-border" style={imageStyle} src={coverLookImage.image}></img>
            </a>
        </div>
    );
};
ImageTile.propTypes = {
    look: PropTypes.string.isRequired
};
export default ImageTile;