import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router';

import LookListDataProvider from "components/module/LookListDataProvider";
import LookList from "components/element/LookList";
import Invite from "components/element/Invite";
import SignupBar from "components/element/SignupBar";
import { userService } from "services";

class Explore extends React.Component {
    state = {
        showSignup:true,
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
        this.setState({showSignup:true})
    }

    render() {
        const isLoggedIn =  userService.isLoggedIn();
        return (
            <div>
                <LookListDataProvider config={{type:"EXPLORE"}} render={looks=><LookList title={"EXPLORE"} looks={looks} />} /> 
                {
                    !isLoggedIn &&  this.state.showSignup &&
                        <div>
                            <SignupBar {...this.props} />
                        </div>
                }          
            </div>
        )
    }
}

export default withRouter(Explore)
