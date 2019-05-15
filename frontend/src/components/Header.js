import React from "react";
import PropTypes from "prop-types";

class Header extends React.Component {
    render() {
        return (
            <nav class="navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
                <div class="container">
                    <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                     <h1><strong>Eastyler</strong></h1>
                    </a>
                    <p class="navbar-item">Find your style.</p>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header
