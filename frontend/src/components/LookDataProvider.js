import React, { Component } from "react";
import PropTypes from "prop-types";

import { lookService } from "../services";

class LookDataProvider extends Component {
  static propTypes = {
    lookId: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  };
  state = {
      look: [],
      loaded: false,
      placeholder: "Loading..."
    };
  componentDidMount() {
    lookService.retrieveLook(this.props.lookId)
      .then(look => this.setState({ look: look, loaded: true }))
      .catch(e => {
        this.setState({ placeholder: "Something went wrong" });
      });
  }
  render() {
    const { look, loaded, placeholder } = this.state;
    return loaded ? this.props.render(look) : <p>{placeholder}</p>;
  }
}
export default LookDataProvider;