import React, { Component } from "react";
import PropTypes from "prop-types";

import { lookService } from "services";
import ErrorPage from "components/page/ErrorPage";

class LookDataProvider extends Component {
  state = {
      look: [],
      loaded: false,
      placeholder: "Loading..."
    };
  componentDidMount() {
    lookService.retrieveLook(this.props.lookId, this.props.preview)
      .then(
        look => this.setState({ look: look, loaded: true })
      )
      .catch(e => {
        this.setState({ placeholder: e });
      });
  }
  render() {
    const { look, loaded, placeholder } = this.state;
    return loaded ? this.props.render(look) : 
      <ErrorPage error={placeholder} />
  }
}
export default LookDataProvider;