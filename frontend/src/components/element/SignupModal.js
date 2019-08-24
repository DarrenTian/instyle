import React from "react";
import PropTypes from "prop-types";

class SignupModal extends React.Component {
    cancel = () => {
        this.props.cancelHandler();
    }

    render() {
        return (
            <div className={"modal "+(this.props.isActive ? "is-active":"")}>
                <div className="modal-background" onClick={this.cancel}>
                </div> 
                <div className="modal-card" style={{maxWidth: "400px"}}>
                    signup
                </div>
            </div>
        )
    }
}

export default SignupModal
