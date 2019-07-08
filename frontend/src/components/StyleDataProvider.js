import React, { Component } from "react";
import PropTypes from "prop-types";

import { styleService } from "../services";

class StyleDataProvider extends Component {
  static propTypes = {
    styleId: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  };
  state = {
      style: [],
      loaded: false,
      placeholder: "Loading..."
    };
  componentDidMount() {
    styleService.getStyle(this.props.styleId)
      .then(style => this.setState({ style: style, loaded: true }))
      .catch(e => {
        console.log(e);
        this.setState({ placeholder: "Something went wrong" });
      });
  }
  render() {
    const { style, loaded, placeholder } = this.state;
    return loaded ? this.props.render(style) : <p>{placeholder}</p>;
  }
}
export default StyleDataProvider;