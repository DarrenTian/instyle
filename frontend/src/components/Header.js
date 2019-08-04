import React from "react";
import PropTypes from "prop-types";
import { userService } from "../services";
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

    logout = () => {
        event.preventDefault();
        userService.logout();
        window.location.reload();
    }

    render() {   
        const navBarStyle = {
            boxShadow:"0px 1px 1px #e6e6e6",
        };
        const avatarStyle = {
            objectFit: "cover",
            width: "2rem",
            height: "2rem",
        }
        const titleStyle = {
            fontFamily: "Quando",
            fontStyle: "normal",
            fontWeight: "normal",
        }
        let navEnd;
        if (!this.props.isLoggedIn) {
            navEnd = <div className="navbar-end">
              <a className="navbar-item" href="/welcome">
                Home
              </a>
              <a className="navbar-item" href="/doc/about">
                About
              </a>
              <a className="navbar-item" href="/doc/terms">
                Terms
              </a>
              <a className="navbar-item" href="/doc/contact">
                Contact
              </a>
              <div className="navbar-item">
                <a className="button is-light" href="/login">Log in</a>
              </div>
            </div>
        } else {
            const profile = userService.getProfile();
            navEnd = <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link header-figure is-arrowless">
                  <img src={profile? profile.avatar_image : null} style={avatarStyle}/>
                  <p>{profile? profile.nickname : null}</p>
                </a>
                <div className="navbar-dropdown">
                 <a className="navbar-item" href="/welcome">
                    Home
                  </a>
                  <a className="navbar-item" href="/console">
                    Console
                  </a>
                  <a className="navbar-item" href="/profile">
                    Profile
                  </a>
                  <hr className="navbar-divider"/>
                  <a className="navbar-item" href="/welcome" onClick={this.logout}>
                    Log out
                  </a>
                </div>
              </div>
            </div>
        }

        return (
            <div style={navBarStyle}>
                <nav className="navbar" role="navigation" aria-label="main navigation" >
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            <div className="navbar-logo">
                                <img src="/static/logo_transparent.png"/>
                            </div>
                            <div className="vertical-line"></div>
                            <h1 className="navbar-name" style={titleStyle}>Eastyler</h1>
                        </a>
                        <a role="button" className={`navbar-burger burger ${this.state.activeMenu ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarMenu" onClick={this.toggleMenu}>
                          <span aria-hidden="true"></span>
                          <span aria-hidden="true"></span>
                          <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarMenu" className={`navbar-menu ${this.state.activeMenu ? 'is-active' : ''}`}>
                        {navEnd}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header
