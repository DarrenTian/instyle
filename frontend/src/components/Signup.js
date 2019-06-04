import React from "react";
import { withRouter } from 'react-router';

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username : '',
			displayName : '',
			password : '',
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { username, password} = this.state;
		fetch('/api/users/create_user/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: username,
                password: password,
                // TODO: make display name work.
            })
        })
        .then(response => response.json())
        .then(data => {
        	localStorage.setItem("userAuthToken", data.token);
        	this.props.history.push('/console');
        	console.log(data.token);
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
				                <input type="email" placeholder="Your email address" class="input" name="username" onChange={this.handleChange} required />
				                <span class="icon is-small is-left">
				                  <i class="fa fa-envelope"></i>
				                </span>
				              </div>
				            </div>
				            <div class="field">
				              <label class="label">Username</label>
				              <div class="control has-icons-left">
				                <input type="text" placeholder="Pick a display name" class="input" name="displayName" onChange={this.handleChange} required />
				                <span class="icon is-small is-left">
				                  <i class="fa fa-user"></i>
				                </span>
				              </div>
				            </div>
				            <div class="field">
				              <label class="label">Password</label>
				              <div class="control has-icons-left">
				                <input type="password" placeholder="*******" class="input" name="password" onChange={this.handleChange} required />
				                <span class="icon is-small is-left">
				                  <i class="fa fa-lock"></i>
				                </span>
				              </div>
				            </div>
				            <div class="field">
				            	<input type="submit" value="Sign Up" class="button is-outlined is-fullwidth" />
				            </div>
				            <div class="field is-fullwidth">
			            		<div class="is-flex-centered">				            		
			            			<p class="is-size-7">By continuing, you agree Eastyler's <a href="/doc/terms">Terms of Service</a></p>
								</div>
			    				<div class="is-flex-centered">
			    					<b><p class="is-size-7">Already an Eastyler? <a href="/login">Log in</a></p></b>
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

export default withRouter(Signup);