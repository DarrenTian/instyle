import React from "react";
import PropTypes from "prop-types";

import { userService } from "services";
import { withRouter } from 'react-router';

class SignupForm extends React.Component {
    state = {
        username : '',
        displayName : '',
        password : '',
        errorMsg : '',
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, displayName, password} = this.state;
        userService.signup(username, password, displayName)
            .then(data => {
                localStorage.setItem("userAuthToken", data.token);
                this.props.loginHandler();
                this.props.history.push('/console');
            })
            .catch(e => {
                this.setState({
                    errorMsg : e,
                });
            });
    }

    login = ()=> {
        this.props.login();
    }

    render() {
        const formStyle={
            padding:"0px 15px",
        }
        return (
            <div style={formStyle}>
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
                    <div className="field is-flex-centered">
                        <p className="is-size-7">{this.state.errorMsg}</p>
                    </div>
                    <div className="is-flex-centered">                                  
                        <p className="is-size-7">By continuing, you agree Eastyler's <a href="/doc/terms">Terms of Service</a></p>
                    </div>
                    <div className="is-flex-centered">
                        <b><p className="is-size-7">Already an Eastyler? <span className="is-clickable" onClick={this.login}>Log in</span></p></b>
                    </div>
                </div>
              </form>
            </div>
        )
    }
}

export default withRouter(SignupForm)
