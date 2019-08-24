import React from "react";
import PropTypes from "prop-types";

class ActionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    action = () => {
        this.props.actionHandler();
    }

    cancel = () => {
        this.props.cancelHandler();
    }

    render() {
        return (
            <div className={"modal "+(this.props.isActive ? "is-active":"")}>
                <div className="modal-background" onClick={this.cancel}>
                </div> 
                <div className="modal-card" style={{maxWidth: "400px"}}>
                    <header className="modal-card-head "><p className="modal-card-title is-size-5">{this.props.title}</p></header>
                    <footer className="modal-card-foot">
                        <div style={{margin: "0 auto"}}>
                            <button className="button is-danger is-outlined" onClick={this.action}>
                                {this.props.action}
                            </button>
                            <button className="button" onClick={this.cancel}>
                                Cancel
                        </button>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

export default ActionModal
