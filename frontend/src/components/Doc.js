import React from "react";
import PropTypes from "prop-types";

const Doc = ({match}) => {
	let content = '';
	const topic = match.params.topic;
	switch(topic) {
		case 'terms':
			content = (
				<div>
					<h1>Terms & Conditions</h1>
					<p>Tell something about terms and conditions.</p>
				</div>
			)
			break;
		case 'contact':
			content = (
				<div>
					<h1>Contact Us</h1>
					<p>Tell how to contact us.</p>
				</div>
			)
			break;
		case 'about': 
		default:
			content = (
				<div>
					<h1>About Us</h1>
					<p>Tell something about us.</p>
				</div>
			)
	}
	const abc = (
		<div className="container doc-container">
			<section className="section">
				<div className="content">
					{content}
				</div>
			</section>
		</div>
	)
	return abc
}

export default Doc;