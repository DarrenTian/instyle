import React from "react";
import PropTypes from "prop-types";

class Invite extends React.Component {
    constructor(props) {
        super(props);
        this.introStyle = {
            textAlign: "center",
            height: "400px",
            paddingTop: "150px",
            backgroundColor: "#00d1b2",
            fontSize: "35px",
            color: "white",
            marginBottom: "20px",
        };
        this.state = {
            email: '',
        };
    }

    changeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    inviteMe = () => {
        console.log("TODO: Implement invite me api: " +this.state.email);
    }

    render() {
        return (
            <div className="columns is-centered">
                <nav className="panel is-half column">
                    <p className="panel-heading">
                        Build your own style!
                    </p>
                    <div className="panel-block">
                        <div className="field is-grouped column is-full">
                            <div className="control has-icons-left is-expanded">
                                <input className="input" type="email" placeholder="Email input" 
                                       value={this.state.email}
                                       onChange={this.changeEmail}></input>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                            </div>
                            <div className="control">
                                <button className="button is-link" onClick={this.inviteMe}>Invite me</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Invite
