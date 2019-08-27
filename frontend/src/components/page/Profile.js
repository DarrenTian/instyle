import React from "react";
import PropTypes from "prop-types";

import { userService, userUtil } from "services";

class Profile extends React.Component {
  state = {
  	profile: {},
  	errMsg: '',
  	saved : false,
  };

  updateCachedProfile = (profile) => {
  	userUtil.updateCachedProfile(profile);
  }

  handleChange = (e) => {
	const { name, value } = e.target;
	const state = { ...this.state };
	state.profile[name] = value;
	state.saved = false;
	this.setState(state);
  }

  updateProfile = () => {
  	event.preventDefault();
  	userService.updateUserProfile(this.state.profile)
  		.then(user=>{
  			this.setState({ profile: user.profile, saved: true});
  			this.updateCachedProfile(user.profile);

  		})
  		.catch(error=> {
  			this.setState({'errMsg':error});
  		})
  }

  componentDidMount() {
  	userService.getUserProfile()
  		.then(user=>{
  			this.setState({ profile: user.profile });
  			this.updateCachedProfile(user.profile);
  		})
  }

  setAvatarImage = (e) => {
    const data = new FormData() ;
    data.append('file', e.target.files[0]);
    userService.setUserAvatarImage(data)
      .then((user) => {
      	this.updateCachedProfile(user.profile);
      	const state = { ...this.state };
      	state.profile = user.profile;
      	this.setState(state);
    });
  }

  render() {
  	const biographyStyle = {
  		height: "200px",
  	}
  	const avatarStyle = {
  		objectFit: "cover",
  		width: "100%",
  		height: "100%",
  	}
    return (
    	<div>
			<section className="hero is-halfheight">
			  <div className="hero-body">
			    <div className="container" >
			      <div className="columns is-centered">
			        <div className="column is-11-tablet is-8-desktop is-8-widescreen">
			          <form onSubmit={this.updateProfile}>
			          	<div className="field is-horizontal">
						  <div className="field-label is-normal">
						    <label className="label">Profile Image</label>
						  </div>
						  <div className="field-body">
						    <div className="field">
						      <div className="control">
			                	<figure className="image is-96x96">
                    				<img className="is-rounded" style={avatarStyle} src={this.state.profile.avatar_image_thumbnail}></img>
                				</figure>
						      </div>
						      <br/>
								<div className="file">
			                        <label className="file-label">
			                          <input className="file-input" type="file" name="resume" onChange={this.setAvatarImage} />
			                          <span className="file-cta">
			                            <span className="file-icon">
			                              <i className="fas fa-upload"></i>
			                            </span>
			                            <span className="file-label">
			                              Upload your avatar
			                            </span>
			                          </span>
			                        </label>
			                      </div>
						    </div>
						  </div>
						</div>
			          	<div className="field is-horizontal">
						  <div className="field-label is-normal">
						    <label className="label">Email</label>
						  </div>
						  <div className="field-body">
						    <div className="field">
						      <div className="control">
						        <input type="email" className="input" name="email" defaultValue={this.state.profile.email} onChange={this.handleChange} disabled />
						      </div>
						    </div>
						  </div>
						</div>

						<div className="field is-horizontal">
						  <div className="field-label is-normal">
						    <label className="label">Display Name</label>
						  </div>
						  <div className="field-body">
						    <div className="field">
						      <div className="control">
			                	<input type="text" className="input" name="nickname" defaultValue={this.state.profile.nickname} onChange={this.handleChange} required />
						      </div>
						    </div>
						  </div>
						</div>

						<div className="field is-horizontal">
						  <div className="field-label is-normal">
						    <label className="label">Biography</label>
						  </div>
						  <div className="field-body">
						    <div className="field">
						      <div className="control">
						        <textarea name="biography" rows="10" className="input" value={this.state.profile.biography} style={biographyStyle} onChange={this.handleChange} >{this.state.profile.nickname}</textarea>
						      </div>
						    </div>
						  </div>
						</div>

						<div className="field is-horizontal">
						  <div className="field-label">
						  </div>
						  <div className="field-body">
							 <div className="field">
					            <input type="submit" value={this.state.saved ? "Saved" : "Save Profile"} className="button is-outlined" />
					         </div>
						  </div>
						</div>

						<div className="field is-horizontal">
						  <div className="field-label">
						  </div>
						  <div className="field-body">
							 <div className="field">
					            <div>{this.state.errMsg}</div>
					         </div>
						  </div>
						</div>
						
			          </form>
			        </div>
			      </div>
			    </div>
			  </div>
			</section>
			{ process.env.PROD_ENV == "DEV" && <div><pre>{JSON.stringify(this.state.profile, null, 2)}</pre></div> }
		</div>
    )
  }
}
export default Profile