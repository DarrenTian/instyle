import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router';

import LookListDataProvider from "components/module/LookListDataProvider";
import Look from "components/element/Look";
import LookList from "components/element/LookList";
import Invite from "components/element/Invite";
import SignupBar from "components/element/SignupBar";

class Following extends React.Component {
    render() {
        return (
            <div className="main-canvas-container"> 
                <LookListDataProvider config={{type:"FOLLOWING"}} render={looks=><LookList {...this.props} title={"FOLLOWING"} looks={looks} />} /> 
                {/*
                    <LookListDataProvider config={{type:"EXPLORE"}} render={looks=>looks.map((look, key)=><Look key={key} {...this.props} look={look} />)} />      
                */}
            </div>
        )
    }
}

export default withRouter(Following)
