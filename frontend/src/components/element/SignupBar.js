import React from "react";
import PropTypes from "prop-types";

import SignupModal from "components/element/SignupModal";
import LoginModal from "components/element/LoginModal";

class SignupBar extends React.Component {
    state = {
        signup: false,
        login: false
    }

    login = () => {
        this.setState({login:true});
    }

    cancelLogin = () => {
        this.setState({login:false});
    }

    signup = () => {
        this.setState({signup:true});
    }

    cancelSignup = () => {
        this.setState({signup:false});
    }

    render() {
        const signupBarStyle = {
            position:"fixed",
            bottom:"0",
            width:"100%",
            height:"60px", 
            background:"#6cf"
        }
        const isHidden = this.state.signup || this.state.login;
        return (
            <div>
                <div className={isHidden?"is-hidden":null} style={signupBarStyle}>
                    Discover more trending looks with an Eastyler account.
                    Signup or login to continue exploring and saving your favorite looks.
                    <div className="button" onClick={this.signup}>
                        Signup
                    </div>
                    <div className="button" onClick={this.login}>
                        Login
                    </div>
                </div>
                <SignupModal  isActive={this.state.signup} 
                              cancelHandler={this.cancelSignup}/>
                <LoginModal isActive={this.state.login} 
                            cancelHandler={this.cancelLogin}/>
            </div>
        )
    }
}

export default SignupBar
