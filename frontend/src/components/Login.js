import React from "react";

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username : 'b@b.com',
			password : 'hello',
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { username, password} = this.state;
		fetch('/api/obtain_auth_token/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then(response => {
            console.log(response);
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
				            <input type="submit" class="button is-outlined is-fullwidth" />
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

export default Login;