import React from "react";
import PropTypes from "prop-types";

class Promotion extends React.Component {
    render() {
        const promotionStyle = {
            maxWidth: "769px",
            padding: "0rem 0.5rem",
            margin: "0rem auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)",
            borderRadius: "5px",
            height:"50px",
        }
        const shouldShow = false;
        return (
            <div>
            {shouldShow &&
                    <div style={promotionStyle}>
                        <div className="is-inline-block has-text-weight-bold">
                            Get a $10 Nordstrom giftcard for publishing your first 5 looks!
                        </div>
                    </div>
            }
            </div>
        )
    }
}

export default Promotion
