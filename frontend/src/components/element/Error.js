import React from "react";
import PropTypes from "prop-types";

class Error extends React.Component {
    render() {
        const isLoading = this.props.error == 'Loading';
        if (isLoading) {
            return (
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            )
        } else {
            return (
                <div>
                    {this.props.error ? this.props.error : "The page your are visiting does not exist."}
                </div>
            )   
        }

    }
}

export default Error
