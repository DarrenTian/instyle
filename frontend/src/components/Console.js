import React from "react";
import { withRouter } from 'react-router';

class Console extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const consoleWrapperStyle = {
		}
		const consoleStyle = {
			width: "769px",
			padding: "1rem 1.5rem",
			margin: "1rem auto",
			justifyContent: "flex-start",
		}
		const looksStyle = {
			padding: "1rem 0.5rem",
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			boxShadow: "0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)",
			marginTop: "15px",
			borderRadius: "5px",
			//justifyContent: "space-between",
		}
		const lookStyle = {
			width: "235px",
			padding: "10px",
			borderRadius: "5px",
		}
		const previewImageStyle = {
			borderRadius: "5px",
		}
		const looks = [1,2,3]
		return (
				<div className="console" style={consoleStyle} >
						<button className="button">
							Create New Look
						</button>
						<div className="" style={looksStyle}>
							{looks.map((value, index)=>{
								return (
									<div style={lookStyle} key={index}>
										<img style={previewImageStyle} src="./media/addict.attitude/1.jpg"></img>
									</div>
								)
							})}
						</div>
				</div>
		)
	}
}

export default withRouter(Console);