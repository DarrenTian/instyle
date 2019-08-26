import React from "react";
import PropTypes from "prop-types";

import SignupModal from "components/element/SignupModal";
import LoginModal from "components/element/LoginModal";

class LoginModalGroup extends React.Component {
    state = {
        signup: false,
        login: false,
    }

    componentDidMount() {
        if (this.props.initialState=='signup') {
            this.setState({signup:true});
        }
        if (this.props.initialState=='login') {
            this.setState({login:true});
        }
    }


    login = () => {
        this.setState({login:true});
    }

    cancelLogin = () => {
        this.setState({login:false});
        this.props.cancel();
    }

    signup = () => {
        this.setState({signup:true});
    }

    cancelSignup = () => {
        this.setState({signup:false});
        this.props.cancel();
    }

    switchSignup = ()=> {
        this.setState({login:false, signup:true})
    }

    switchLogin = ()=>{
        this.setState({login:true, signup:false})
    }

    render() {
        return (
            <React.Fragment>
                <SignupModal {...this.props} 
                            isActive={this.state.signup} 
                            cancelHandler={this.cancelSignup}
                            login={this.switchLogin}/>
                <LoginModal {...this.props}
                            isActive={this.state.login} 
                            cancelHandler={this.cancelLogin}
                            signup={this.switchSignup}/>
            </React.Fragment>
        )
    }
}

export default LoginModalGroup
