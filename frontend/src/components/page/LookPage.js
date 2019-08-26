import React from "react";
import PropTypes from "prop-types";

import LookDataProvider from "components/module/LookDataProvider";
import LookListDataProvider from "components/module/LookListDataProvider";
import Look from "components/element/Look";
import LookList from "components/element/LookList";

class LookPage extends React.Component {
	render() {
		return (
			<div>
	  			<LookDataProvider lookId={this.props.match.params.id} preview={this.props.preview} render={look => <Look {...this.props} look={look} preview={this.props.preview} />} />
	  			<LookListDataProvider config={{type:"LOOK", lookId:this.props.match.params.id}} render={looks=><LookList {...this.props} title={"MORE_LOOKS"} looks={looks} />} />
	  		</div>
		);
	}

}

export default LookPage