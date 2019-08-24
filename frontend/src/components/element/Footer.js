import React from "react";
import PropTypes from "prop-types";

class Footer extends React.Component {
    render() {
        const footerStyle = {
            color:"#A9ABAC",
        }
        return (
            <footer className="footer">
              <div className="content has-text-centered">
                <p className="is-size-7" style={footerStyle}>
                    © Copyright 2019 www.eastyler.com - All Rights Reserved
                </p>
              </div>
            </footer>
        )
    }
}

export default Footer
