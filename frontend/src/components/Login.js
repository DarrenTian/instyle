import React from "react";
import { userService } from "../services";
import { withRouter } from 'react-router';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username : 'b@b.com',
			password : 'hello',
			errorMsg : '',
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { username, password} = this.state;
	 	userService
	 		.login(username, password)
	        .then(data => {
				localStorage.setItem("userAuthToken", data.token);
	        	this.props.loginHandler();
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
				<section class="hero is-halfheight">
				  <div class="hero-body">
				    <div class="container" >
				      <div class="columns is-centered">
				        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
				          <form class="box" onSubmit={this.handleSubmit}>
				            <div class="field">
				              <label class="label">Email</label>
				              <div class="control has-icons-left">
				                <input type="email" placeholder="Your email address" class="input" name="username" defaultValue="b@b.com" onChange={this.handleChange} required />
				                <span class="icon is-small is-left">
				                  <i class="fa fa-envelope"></i>
				                </span>
				              </div>
				            </div>
				            <div class="field">
				              <label class="label">Password</label>
				              <div class="control has-icons-left">
				                <input type="password" placeholder="*******" class="input" name="password" defaultValue="hello" onChange={this.handleChange} required />
				                <span class="icon is-small is-left">
				                  <i class="fa fa-lock"></i>
				                </span>
				              </div>
				            </div>
				            <div class="field">
				            	<input type="submit" value="Login" class="button is-outlined is-fullwidth" />
				            </div>
				            <div class="field is-flex-centered">
				            	<p class="is-size-7">{this.state.errorMsg}</p>
				            </div>
				            <div class="field is-fullwidth">
				            	<div class="is-flex-centered">
				    				<p class="is-size-7">No account yet? <a href="/signup">Sign up</a></p>
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