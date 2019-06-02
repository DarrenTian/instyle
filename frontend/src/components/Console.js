import React from "react";
import { withRouter } from 'react-router';

class Console extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				This is console
			</div>
		)
	}
}

export default withRouter(Console);