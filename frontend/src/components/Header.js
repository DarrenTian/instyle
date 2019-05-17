import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class Header extends React.Component {
    render() {
        return (
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                        <div class="navbar-logo">
                            <img src="./static/logo_transparent.png"/>
                        </div>
                        <h1><strong>Eastyler</strong></h1>
                    </a>
                    <p class="navbar-item">Find your style.</p>
                </div>
            </nav>
        )
    }
}

export default Header
