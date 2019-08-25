import React from "react";
import { withRouter } from 'react-router';

import { userService } from "services";
import SignupForm from "components/element/SignupForm"

class Signup extends React.Component {
	login = ()=>{
		this.props.history.push("/login");
	}

	render() {
		return (
			<div>
				<section className="hero is-halfheight">
				  <div className="hero-body">
				    <div className="container" >
				      <div className="columns is-centered">
				        <div className="column is-5-tablet is-4-desktop is-3-widescreen">
				        	<SignupForm {...this.props} login={this.login}/>
				        </div>
				      </div>
				    </div>
				  </div>
				</section>
			</div>
		)
	}
}

export default withRouter(Signup);