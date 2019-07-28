import React from "react";
import PropTypes from "prop-types";

const ErrorPage = ({ error }) => {
    return (
        <div>
            <div className="section columns is-centered is-marginless">
                <div className="columns container is-centered is-widescreen">
                    {error ? error : "The page your are visiting does not exist."}
                </div>
            </div>
        </div>
    )
};

export default ErrorPage;