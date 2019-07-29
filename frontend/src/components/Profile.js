import React from "react";
import PropTypes from "prop-types";

import { userService } from "../services";

class Profile extends React.Component {
  state = {
  	profile: {},
  };

  updateCachedProfile = (profile) => {
  	console.log(profile);
  }

  updateProfile = () => {
  	userService.updateUserProfile(this.state.profile)
  		.then(user=>{
  			this.setState({ profile: user.profile});
  			this.updateCachedProfile(user.profile);
  		})
  }

  componentDidMount() {
  	userService.getUserProfile()
  		.then(user=>{
  			this.setState({ profile: user.profile });
  			this.updateCachedProfile(user.profile);
  		})
  }

  render() {
    return (
    	<div>
    		{this.state.profile.email}
    		{this.state.profile.avatar_image}
    		 {this.state.profile.biography}
    		 <div className="button" onClick={this.updateProfile}>Save</div>
    	</div>
    )
  }
}
export default Profile