import React from "react";
import PropTypes from "prop-types";

const Welcome = () => {
    const introStyle = {
        textAlign: "center",
        height: "400px",
        paddingTop: "150px",
        backgroundColor: "#00d1b2",
        fontSize: "35px",
        color: "white",
        marginBottom: "20px",
    };
    return (
        <div>
            <div style={introStyle} className="introduction column is-full-desktop">
                Styler is the ultimate destination for Stylers.
        </div>
            <div className="columns is-centered">
                <nav className="panel is-half column">
                    <p className="panel-heading">
                        Build your own style!
                    </p>
                    <div className="panel-block">
                        <div className="field is-grouped column is-full">
                            <div className="control has-icons-left is-expanded">
                                <input className="input" type="email" placeholder="Email input"></input>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                            </div>
                            <div className="control">
                                <button className="button is-link">Invite me</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
};
Welcome.propTypes = {
    Welcome: PropTypes.object.isRequired
};
export default Welcome;