import React from "react";
import PropTypes from "prop-types";

import Error from "components/element/Error";

const ErrorPage = ({ error }) => {
    const errorStyle={
    	display: "flex",
    }
    return (
    	<div style={errorStyle}>
    		<div style={{margin:"0 auto"}}>
    			<Error error={error} />
    		</div>
    	</div>
    )
};

export default ErrorPage;