import React, { Component } from "react";
import PropTypes from "prop-types";

class DataProvider extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  };
  state = {
      style: [],
      loaded: false,
      placeholder: "Loading..."
    };
  componentDidMount() {
    fetch(this.props.endpoint)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
      })
      .then(style => this.setState({ style: style, loaded: true }));
  }
  render() {
    const { style, loaded, placeholder } = this.state;
    return loaded ? this.props.render(style) : <p>{placeholder}</p>;
  }
}
export default DataProvider;