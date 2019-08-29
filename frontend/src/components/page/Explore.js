import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router';

import LookListDataProvider from "components/module/LookListDataProvider";
import LookList from "components/element/LookList";
import Invite from "components/element/Invite";
import SignupBar from "components/element/SignupBar";
import { userUtil } from "services";

class Explore extends React.Component {
    state = {
        showSignup:false,
    }
    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = (e)=>{
        // in the future, when we have more looks.
        //if (e.target.scrollingElement.scrollTop>100) {}
        if (!this.state.showSignup) {
            this.setState({showSignup:true})            
        }
    }

    render() {
        const isLoggedIn =  userUtil.isLoggedIn();
        return (
            <React.Fragment>
            <div className="main-canvas-container" >
                <LookListDataProvider config={{type:"EXPLORE"}} render={looks=><LookList {...this.props} title={"EXPLORE"} looks={looks} />} /> 
            </div>
            <div>
                <SignupBar {...this.props} />
            </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Explore)
