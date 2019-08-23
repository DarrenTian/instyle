import React from "react";
import PropTypes from "prop-types";

import { lookUtil } from "../services";
import { UserPreviewFooter } from "./UserPreview";
import LookImage from "./LookImage";

class LookTile extends React.Component {
    render() {
        const look = this.props.look;
        const imageStyle = {
            borderRadius: "5px 5px 0 0",
        };
        const coverLookImage = lookUtil.getCoverLookImage(look);
        const tileContainerStyle = {
            paddingBottom:"10px",
        }
        const tileStyle = {
            borderRadius: "5px",
        }
        return (
            <div className="image-tile" style={tileContainerStyle}>
                <div className="is-thin-border" style={tileStyle}>
                    <a href={"/looks/"+look.url_id}>     
                        <LookImage look={look} isInteractive={false} showTags={false} />
                    </a>
                    <UserPreviewFooter user={look.publisher} url_id={look.url_id} liked={look.liked}/>
                </div>
            </div>
        );   
    }
};
export default LookTile;