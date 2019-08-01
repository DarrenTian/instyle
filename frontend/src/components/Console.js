import React from "react";
import { userLookService } from "../services";
import { lookUtil } from "../services";
import { withRouter } from 'react-router';

import MediaQuery from 'react-responsive';

class Console extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			looks : []
		};
	}

	createLook = () =>  {
		userLookService.createUserLook()
			.then(response => {
				this.props.history.push('/looks/'+response.id + '/edit');
			})
			.catch((e) => {
				// TODO: replace with alert
				console.log("Something went wrong when creating a new look...");
			})
	}

	componentDidMount() {
	    userLookService.listUserLook()
	      .then(looks => {
	      	this.setState({looks:looks});
	      })
	      .catch((e)=>{
	      	// TODO: replace with alert
	      	console.log("Something went wrong when looking for your looks...");
	      })
	 }

	render() {
		const consoleWrapperStyle = {
		}
		const consoleDesktopStyle = {
			width: "769px",
			padding: "0rem 0.5rem",
			margin: "0rem auto",
			justifyContent: "flex-start",
		}
		const newLookStyle = {
			margin: "0.5rem",
		}
		const looksStyle = {
			margin:"5px auto",
			padding: "0rem 0.5rem",
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			boxShadow: "0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)",
			marginTop: "0",
			borderRadius: "5px",
			//justifyContent: "space-around",
		}
		const lookStyle = {
			padding: "10px",
			borderRadius: "5px",
			position: "relative",
			//flex: "0 0 25%",
		}
		const previewImageStyle = {
			objectFit: "cover",
			height: "200px",
			width: "100%",
			maxWidth: "200px",
			borderRadius: "5px",
		}
		// TODO: change mobile to waterfall
		const previewImageMobileStyle = {
			objectFit: "cover",
			height: "200px",
			width: "100%",
			borderRadius: "5px",
		}
		const overlayStyle = {
			position: "absolute",
			left: "10px",
			opacity: "0.7",
		}
		const hintStyle = {
			width: "100%",
			padding: "20px",
		}
		const hasLooks = this.state.looks.length !=0;
		return (
			<div className="console" >
			    <MediaQuery query="(min-width: 769px)">
				    <div style={consoleDesktopStyle}>
				    	<button className="button is-hidden-mobile" style={newLookStyle} onClick={this.createLook}>
							Create New Look
						</button>
						<div className="columns is-mobile" style={looksStyle}>
							{hasLooks? null : <div className="is-flex-centered is-fullwidth" style={hintStyle}>Create your first look!</div>}
							{this.state.looks.map((look, index)=>{
								const lookImage = lookUtil.getCoverImage(look);
								const url = look.publish_status=='P' ? '/looks/'+look.id : '/looks/'+look.id+'/preview';
								return (
									<div className="column is-one-quarter" style={lookStyle} key={index}>
										<a href={url}>
											<img style={previewImageStyle} src={lookImage}></img>
										</a>
										<span style={overlayStyle} className="tag ">
											{look.publish_status=='P' ? <span style={{fontWeight:"800"}}>Published</span> : <span>Draft</span>}
										</span>
										<a href={'/looks/'+look.id + '/edit'}><div className="button is-fullwidth" >Edit</div></a>
									</div>
								)
							})}
						</div>
					</div>
                </MediaQuery>
                <MediaQuery query="(max-width: 769px)">
                	<div className="columns is-mobile is-shadowless" style={looksStyle}>
						{this.state.looks.map((look, index)=>{
							const lookImage = lookUtil.getCoverImage(look);
							const url = look.publish_status=='P' ? '/looks/'+look.id : '/looks/'+look.id+'/preview';
							return (
								<div className="column is-half" style={lookStyle} key={index}>
									<a href={url}><img style={previewImageMobileStyle} src={lookImage}></img></a>
								</div>
							)
						})}
						<div className="is-flex-centered" style={hintStyle}>Create your looks on our desktop site!</div>
					</div>
                </MediaQuery>
			</div>
		)
	}
}

export default withRouter(Console);