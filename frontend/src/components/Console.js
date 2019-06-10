import React from "react";
import { withRouter } from 'react-router';

class Console extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="console">
				This is console
			</div>
		)
	}
}

export default withRouter(Console);