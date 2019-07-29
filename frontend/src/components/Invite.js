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
        this.inviteMeButtonStyle = {
            width: "100%",
            marginTop: ".5rem",
        }
        this.inviteMeSectionStyle = {
            maxWidth: "480px",
        }
        this.state = {
            email: '',
            invited: false,
        };
    }

    changeEmail = (event) => {
        this.setState({
            email: event.target.value,
            invited: false,
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
                this.setState({
                    email: '',
                    invited: true,
                });
            } else {
                console.log("Invitation is closed.");
            }
        });
    }

    render() {
        return (
            <div>
              <section className="section" >
                <div className="container" style={this.inviteMeSectionStyle}>
                    <h2 className="subtitle">
                        Build your look;<br/>
                        Share your style.
                    </h2>
                    <div className="control has-icons-left">
                        <input className="input" type="email" placeholder="Your email address" 
                               value={this.state.email}
                               onChange={this.changeEmail} required></input>
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </div>
                    <div id="inviteMe" className="control">
                        {this.state.invited ?
                        <button className="button invite-me-button" style={this.inviteMeButtonStyle} >Expect your invitation to arrive soon!</button> :
                        <button className="button has-background-grey-dark has-text-white invite-me-button" style={this.inviteMeButtonStyle} onClick={this.inviteMe}>Invite me!</button>
                        }
                    </div>
                </div>
              </section>
            </div>
        )
    }
}

export default Invite
