import React from "react";
import { userService } from "../services";
import { withRouter } from 'react-router';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email : '',
			password : '',
			errorMsg : '',
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { email, password} = this.state;
	 	userService
	 		.login(email, password)
	        .then(data => {
	        	// When success, loginHandler updates the whole app's state
	        	this.props.loginHandler();
	        	// And redirect to console page
	        	this.props.history.push('/console');
	        })
	        .catch(error => {
		        this.setState({
		        	errorMsg : error,
		        });
		    });
	}

	render() {
		return (
			<div>
				<section className="hero is-halfheight">
				  <div className="hero-body">
				    <div className="container" >
				      <div className="columns is-centered">
				        <div className="column is-5-tablet is-4-desktop is-3-widescreen">
				          <form className="box" onSubmit={this.handleSubmit}>
				            <div className="field">
				              <label className="label">Email</label>
				              <div className="control has-icons-left">
				                <input type="email" placeholder="Your email address" className="input" name="email" defaultValue="" onChange={this.handleChange} required />
				                <span className="icon is-small is-left">
				                  <i className="fa fa-envelope"></i>
				                </span>
				              </div>
				            </div>
				            <div className="field">
				              <label className="label">Password</label>
				              <div className="control has-icons-left">
				                <input type="password" placeholder="*******" className="input" name="password" defaultValue="" onChange={this.handleChange} required />
				                <span className="icon is-small is-left">
				                  <i className="fa fa-lock"></i>
				                </span>
				              </div>
				            </div>
				            <div className="field">
				            	<input type="submit" value="Login" className="button is-outlined is-fullwidth" />
				            </div>
				            <div className="field is-flex-centered">
				            	<p className="is-size-7">{this.state.errorMsg}</p>
				            </div>
				            <div className="field is-fullwidth">
				            	<div className="is-flex-centered">
				    				<p className="is-size-7">No account yet? <a href="/signup">Sign up</a></p>
				    			</div>
				            </div>
				          </form>
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