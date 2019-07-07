import React, { Component } from "react";
import PropTypes from "prop-types";

import { styleService } from "../services";

class StyleEditPage extends Component {
  state = {
    style: [],
    look: [],
  };

  saveStyle = () => {
    console.log("saving style");
  };

  publishStyle = () => {
    console.log("publishStyle");
  };

  componentDidMount() {
    const styleId = this.props.match.params.id;
    console.log(styleId);
    styleService.getStyle(styleId)
      .then(style => this.setState({ style: style, look: styleService.styleModelToData(style)}))
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const imageStyle = {
      width: "200px",
    }
    return (
      <div>
        <div>edit ur style</div>
        <div><img style={imageStyle} src={this.state.look.image} /></div>
        <div>{this.state.look.description}</div>
        <button className="button" onClick={this.saveStyle}>Save as Draft</button>
        <button className="button" onClick={this.publishStyle}>Publish</button>
        <div>Presentation Data</div>
        <div><pre>{JSON.stringify(this.state.look, null, 2)}</pre></div>
        <div>Raw Data</div>
        <div><pre>{JSON.stringify(this.state.style, null, 2)}</pre></div>
      </div>
    )
  }
}
export default StyleEditPage;