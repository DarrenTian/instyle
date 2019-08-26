import React from "react";

import LookListDataProvider from "components/module/LookListDataProvider";
import LookList from "components/element/LookList";
import { UserProfilePreview } from "components/element/UserPreview"

class UserProfilePage extends React.Component {
	render() {
		const userId = this.props.match.params.id;
		return (
			<div>
				<div className="main-canvas-container is-centered">
					<div className="columns section">
						<div className="column is-8 is-offset-2">
							<UserProfilePreview userId={userId}/>
						</div>
					</div>
				</div>
				<LookListDataProvider config={{type:"USER_LOOK", userId:userId}} render={looks=><LookList title={"MORE_LOOKS"} looks={looks} />} />
			</div>
		)
	}
}

export default UserProfilePage;