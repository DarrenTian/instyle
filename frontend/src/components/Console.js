import React from "react";
import { withRouter } from 'react-router';

import MediaQuery from 'react-responsive';

class Console extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const consoleWrapperStyle = {
		}
		const consoleStyle = {
			maxWidth: "769px",
			padding: "0rem 0.5rem",
			margin: "0rem auto",
			justifyContent: "flex-start",
		}
		const newLookStyle = {
			margin: "0.5rem",
		}
		const looksStyle = {
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
			//flex: "0 0 25%",
		}
		const previewImageStyle = {
			borderRadius: "5px",
		}
		const looks = [1,1,1,1,1,1]
		return (
				<div className="console" style={consoleStyle} >
				    <MediaQuery query="(min-width: 769px)">
				    	<button className="button is-hidden-mobile" style={newLookStyle}>
							Create New Look
						</button>
						<div className="columns is-mobile" style={looksStyle}>
							{looks.map((value, index)=>{
								return (
									<div className="column is-one-quarter" style={lookStyle} key={index}>
										<img style={previewImageStyle} src="./media/addict.attitude/1.jpg"></img>
									</div>
								)
							})}
						</div>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 769px)">
                    	<div className="columns is-mobile is-shadowless" style={looksStyle}>
							{looks.map((value, index)=>{
								return (
									<div className="column is-half" style={lookStyle} key={index}>
										<img style={previewImageStyle} src="./media/addict.attitude/1.jpg"></img>
									</div>
								)
							})}
						</div>
                    </MediaQuery>
				</div>
		)
	}
}

export default withRouter(Console);