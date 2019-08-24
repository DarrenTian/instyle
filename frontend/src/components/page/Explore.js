import React from "react";
import PropTypes from "prop-types";

import LookListDataProvider from "components/LookListDataProvider";
import LookList from "components/LookList";
import Invite from "components/Invite";
import { userService } from "services";

class Explore extends React.Component {
    render() {
        const isLoggedIn =  userService.isLoggedIn();
        return (
            <div>
            <LookListDataProvider config={{type:"EXPLORE"}} render={looks=><LookList title={"EXPLORE"} looks={looks} />} />
            {!isLoggedIn && 
                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-8 is-offset-2 has-text-centered">
                                <h1 className="title big-title text-bold is-4">
                                    Join Eastyler to explore more trending looks!
                                </h1>
                                 <div>
                                    <Invite />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
            </div>
        )
    }
}

export default Explore
