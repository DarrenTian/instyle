import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class Header extends React.Component {
    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <div className="navbar-logo">
                            <img src="/static/logo_transparent.png"/>
                        </div>
                    </a>
                </div>
            </nav>
        )
    }
}

export default Header
