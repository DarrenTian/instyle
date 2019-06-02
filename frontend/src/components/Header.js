import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class Header extends React.Component {
    state = {
        activeMenu: false,
    };

    toggleMenu = () => {
        this.setState({
            activeMenu: !this.state.activeMenu,
        });
    };

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
                            <div className="vertical-line"></div>
                            <h1 className="navbar-name">eastyler</h1>
                        </a>
                        <a role="button" className={`navbar-burger burger ${this.state.activeMenu ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarMenu" onClick={this.toggleMenu}>
                          <span aria-hidden="true"></span>
                          <span aria-hidden="true"></span>
                          <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarMenu" className={`navbar-menu ${this.state.activeMenu ? 'is-active' : ''}`}>
                        <div class="navbar-start">
                        </div>

                        <div class="navbar-end">
                          <a class="navbar-item" href="/welcome">
                            Home
                          </a>
                          <a class="navbar-item" href="/doc/about">
                            About
                          </a>
                          <a class="navbar-item" href="/doc/terms">
                            Terms
                          </a>
                          <a class="navbar-item" href="/doc/contact">
                            Contact
                          </a>
                          {process.env.PROD_ENV == "DEV" &&
                           <div class="navbar-item">
                              <a class="button is-light" href="/login">
                                Log in
                              </a>
                          </div>}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header
