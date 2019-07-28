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
        	this.props.loginHandler();
        	this.props.history.push('/console');
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
				                <input type="email" placeholder="Your email address" className="input" name="username" onChange={this.handleChange} required />
				                <span className="icon is-small is-left">
				                  <i className="fa fa-envelope"></i>
				                </span>
				              </div>
				            </div>
				            <div className="field">
				              <label className="label">Username</label>
				              <div className="control has-icons-left">
				                <input type="text" placeholder="Pick a display name" className="input" name="displayName" onChange={this.handleChange} required />
				                <span className="icon is-small is-left">
				                  <i className="fa fa-user"></i>
				                </span>
				              </div>
				            </div>
				            <div className="field">
				              <label className="label">Password</label>
				              <div className="control has-icons-left">
				                <input type="password" placeholder="*******" className="input" name="password" onChange={this.handleChange} required />
				                <span className="icon is-small is-left">
				                  <i className="fa fa-lock"></i>
				                </span>
				              </div>
				            </div>
				            <div className="field">
				            	<input type="submit" value="Sign Up" className="button is-outlined is-fullwidth" />
				            </div>
				            <div className="field is-fullwidth">
			            		<div className="is-flex-centered">				            		
			            			<p className="is-size-7">By continuing, you agree Eastyler's <a href="/doc/terms">Terms of Service</a></p>
								</div>
			    				<div className="is-flex-centered">
			    					<b><p className="is-size-7">Already an Eastyler? <a href="/login">Log in</a></p></b>
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