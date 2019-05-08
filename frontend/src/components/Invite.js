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
        fetch('/api/invitation/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
            })
        })
        .then(response => {
            if (response.status == 201) {
                document
                    .getElementsByClassName("invite-me-button")[0]
                    .style
                    .backgroundColor = "gray";

            } else {
                console.log("Something went wrong");
            }
        });
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
                                <button className="button is-link invite-me-button" onClick={this.inviteMe}>Invite me</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Invite
