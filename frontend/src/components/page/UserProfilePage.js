import React from "react";

import LookListDataProvider from "components/module/LookListDataProvider";
import LookList from "components/element/LookList";
import { UserProfilePreview } from "components/element/UserPreview"

class UserProfilePage extends React.Component {
	render() {
		const userId = this.props.match.params.id;
		return (
			<div className="main-canvas-container" >
				<UserProfilePreview {...this.props} userId={userId}/>	
				<LookListDataProvider config={{type:"USER_LOOK", userId:userId}} render={looks=><LookList {...this.props} title={"MORE_LOOKS"} looks={looks} />} />
			</div>
		)
	}
}

export default UserProfilePage;