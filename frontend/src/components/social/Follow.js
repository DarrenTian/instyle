import React from "react";
import PropTypes from "prop-types";
import { userUtil, socialService } from "../../services";

import LoginModalGroup from "components/element/LoginModalGroup";

class Follow extends React.Component {
	state = {
		login: false,
        following: false,
    };

    componentWillReceiveProps(props) {
        this.setState({following:props.profile.following});
    }

    cancel = ()=> {
    	this.setState({login:false});
    }

    follow = ()=> {
        if (!userUtil.isLoggedIn()) {
            this.setState({login:true});
            return;
        }

        this.setState({following: true})
        socialService.followUser(this.props.userId)
            .then(()=>{
                
            })
            .catch(e=>{
                this.setState({following: false});
            })
    }

    unfollow = ()=> {
        this.setState({following: false})
        socialService.unfollowUser(this.props.userId)
            .then(()=>{
                
            })
            .catch(e=>{
                this.setState({following: true});
            })
    }

    render() {
        if (userUtil.isSelf(this.props.userId)) {
            return null;
        }

        return (
            <div>
                { this.state.following ? 
                    <div className="button is-link" onClick={this.unfollow}>
                            Following
                        </div>
                        :
                        <div className="button is-link is-outlined" onClick={this.follow}>
                            Follow
                        </div>
                    }
    		        {this.state.login && 
    		        	<LoginModalGroup {...this.props} initialState={"login"} cancel={this.cancel}/>
    		        }
            </div>

        )
    }
}

export default Follow

