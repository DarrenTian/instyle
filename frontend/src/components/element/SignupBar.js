import React from "react";
import PropTypes from "prop-types";

import LoginModalGroup from "components/element/LoginModalGroup";

class SignupBar extends React.Component {
    state = {
        signup: false,
        login: false,
        mounted: false,
    }

    login = () => {
        this.setState({login:true});
    }

    signup = () => {
        this.setState({signup:true});
    }

    cancel =()=>{
        this.setState({signup:false, login:false});
    }

    componentWillReceiveProps() { // check for the mounted props
        this.setState({mounted:true});
    }

    render() {
        const signupBarStyle = {
            position:"fixed",
            bottom:"0",
            width:"100%",
            background: "rgba(10, 10, 10, 0.50)",
            maxHeight:"0px",
            transition:"max-height 5s ease 1s",
        }
        const containerStyler = {
            maxWidth: "960px",
            margin: "0 auto",
            alignItems: "center", 
            padding : "10px 15px",
        }
        const buttonsStyle = {
            width: "95%",
        }
        const isHidden = this.state.signup || this.state.login;
        if (this.state.mounted==true) {
            signupBarStyle.maxHeight="500px";
            signupBarStyle.transition="max-height 5s ease 1s";
        }
        return (
            <div>
                <div className={isHidden?"is-hidden":null} style={signupBarStyle}>
                    <div style={containerStyler} className="columns is-widescreen">
                        <div className="column is-7 is-size-5 has-text-white has-text-weight-bold is-paddingless" >
                            Discover more trending looks with an Eastyler account.
                        </div>
                        <div className="column is-3 is-offset-2 is-paddingless" > 
                            <div className="buttons columns is-marginless is-mobile is-2">
                                <div className="column" onClick={this.signup} >
                                    <div className="button is-link is-inverted" style={buttonsStyle}>
                                        Signup
                                    </div>
                                </div>
                                <div className="column is-paddingless" onClick={this.login}>
                                    <div className="button is-link is-inverted is-outlined"style={buttonsStyle}>
                                        Login
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.signup &&
                    <LoginModalGroup {...this.props} initialState={"signup"} cancel={this.cancel}/>
                }
                {this.state.login &&
                    <LoginModalGroup {...this.props} initialState={"login"} cancel={this.cancel}/>
                }
                
            </div>
        )
    }
}

export default SignupBar
