import React, { Component } from "react";
import PropTypes from "prop-types";

import { styleService } from "../services";

class StyleEditPage extends Component {
  state = {
      style: [],
    };
  componentDidMount() {
    const styleId = this.props.match.params.id;
    console.log(styleId);
    styleService.getStyle(styleId)
      .then(style => this.setState({ style: style}))
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <div>
        <div>edit ur style</div>
        <div><pre>{JSON.stringify(this.state.style, null, 2)}</pre></div>
      </div>
    )
  }
}
export default StyleEditPage;