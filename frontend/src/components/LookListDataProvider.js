import React, { Component } from "react";
import PropTypes from "prop-types";

import { lookService } from "../services";
import ErrorPage from "./ErrorPage";

class LookListDataProvider extends Component {
  state = {
      looks: [],
      loaded: false,
      placeholder: "Loading..."
    };
  componentDidMount() {
    lookService.retrieveMoreLooks(this.props.config)
      .then(
        looks => this.setState({ looks: looks, loaded: true })
      )
      .catch(e => {
        this.setState({ placeholder: e });
      });
  }
  render() {
    const { looks, loaded, placeholder } = this.state;
    return loaded ? this.props.render(looks) : 
      <ErrorPage error={placeholder} />
  }
}
export default LookListDataProvider;