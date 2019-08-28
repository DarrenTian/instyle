import React from "react";
import PropTypes from "prop-types";

import LazyLoad from 'react-lazyload';

import { lookUtil } from "services";

class LookImage extends React.Component {
    constructor(props) {
        super(props);
        this.tagContainer = React.createRef();
        this.state = {
          loaded: false
        };
    }

    updateLook = (e) => {
        this.setState({loaded:true});
        this.forceUpdate();
    }

    render() {
        const imageStyle = {
            borderRadius: "5px 5px 0 0",
            display:"none",
        };

        const tagContainerStyle = {
            position: "relative",
            width: "100%",
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
        // const imageContainerStyle={
        //   position:"relative",
        //   width:"100%",
        //   paddingTop:"60%",
        // }
        // if (this.state.loaded==true) {
        //   imageContainerStyle.paddingTop = null;      
        // }
        const coverImage = lookUtil.getCoverImage(this.props.look);
        const tags = lookUtil.getTags(this.props.look);

        return (
            <div style={tagContainerStyle} ref={this.tagContainer}>
                <div>
                  <img className="is-block" style={imageStyle} src={coverImage} onLoad={this.updateLook}></img>
                </div>
                {this.state.loaded && this.props.showTags==true && tags && tags.map((tag, index)=> {
                    let singleTagStyle = {...tagStyle}
                    let singleDotStyle = {...dotStyle}
                    let isSelected = false
                    if (this.props.isInteractive==true) {
                        isSelected = index == this.props.view.selectedTag.index;
                        singleTagStyle = isSelected ? {...selectedTagStyle} : {...singleTagStyle};
                        singleDotStyle = isSelected ? {...selectedDotStyle} : {...singleDotStyle};
                    }

                    if (this.tagContainer.current) {
                      singleTagStyle.left = singleTagStyle.left + tag.coor_x * this.tagContainer.current.clientWidth + "px";
                      singleTagStyle.top = singleTagStyle.top + tag.coor_y * this.tagContainer.current.clientHeight + "px";
                      singleDotStyle.left = singleDotStyle.left + tag.coor_x * this.tagContainer.current.clientWidth + "px";
                      singleDotStyle.top = singleDotStyle.top + tag.coor_y * this.tagContainer.current.clientHeight + "px";     
                    }
                    return (
                        <div key={index} className="is-clickable" onClick={()=>this.props.selectTag(index)}>
                            <div className={isSelected ? "is-scale-blink" : "is-blink"} style={singleTagStyle}></div>
                            <div className={isSelected ? "" : "is-blink"} style={singleDotStyle}></div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default LookImage
