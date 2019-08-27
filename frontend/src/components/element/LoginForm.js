import React from "react";
import PropTypes from "prop-types";

import { userService } from "services";
import { withRouter } from 'react-router';

class LoginForm extends React.Component {
    state = {
        email : '',
        password : '',
        errorMsg : '',
    };

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
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    errorMsg : error,
                });
            });
    }

    signup = () => {
        this.props.signup();
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
                        <p className="is-size-7">No account yet? <span className="is-clickable" onClick={this.signup}>Sign up</span></p>
                    </div>
                </div>
              </form>
          </div>
        )
    }
}

export default withRouter(LoginForm)
