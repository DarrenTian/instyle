import React from "react";
import PropTypes from "prop-types";

import { lookUtil } from "../services";
import { UserPreviewFooter } from "./UserPreview";


const ImageTile = ({ look }) => {
    const imageStyle = {
        borderRadius: "5px"
    };
    const coverLookImage = lookUtil.getCoverLookImage(look);
    const tileStyle = {
        borderRadius: "5px",
    }
    return (
         <a href={"/looks/"+look.url_id}>      
        <div className="is-thin-border image-tile" style={tileStyle}>
            <img className="" style={imageStyle} src={coverLookImage.image}></img>
                    <UserPreviewFooter user={look.publisher}/>
        </div>
        </a>
    );
};
ImageTile.propTypes = {
    look: PropTypes.string.isRequired
};
export default ImageTile;