import React from "react";
import { withRouter } from 'react-router';

import LoginForm from "components/element/LoginForm";

class Login extends React.Component {
	signup = ()=>{
		this.props.history.push("/signup");
	}

	render() {
		return (
			<div>
				<section className="hero is-halfheight">
				  <div className="hero-body">
				    <div className="container" >
				      <div className="columns is-centered">
				        <div className="column is-5-tablet is-4-desktop is-4-widescreen">
				        	<LoginForm {...this.props} signup={this.signup}/>
				        </div>
				      </div>
				    </div>
				  </div>
				</section>
			</div>
		)
	}
}

export default withRouter(Login);