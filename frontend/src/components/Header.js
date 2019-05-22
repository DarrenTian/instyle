import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class Header extends React.Component {
    render() {
        const navBarStyle = {
            boxShadow:"0px 1px 1px lightgray",
        };
        return (
            <div style={navBarStyle}>
                <nav className="navbar" role="navigation" aria-label="main navigation" >
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            <div className="navbar-logo">
                                <img src="/static/logo_transparent.png"/>
                            </div>
                        </a>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header
