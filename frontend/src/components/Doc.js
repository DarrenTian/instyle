import React from "react";
import PropTypes from "prop-types";

const Doc = ({match}) => {
	let content = '';
	const topic = match.params.topic;
	switch(topic) {
		case 'terms':
			content = (
				<div>
					<h1>Terms of Use</h1>
					<h2>Open Platform</h2>
					<p>Eastyler is an open platform where anyone can sign-up and use.</p>
					<h2>Free Service</h2>
					<p>Eastyler does not charge users and will remain for free.</p>
					<h2>Affiliate links & Advertisements</h2>
					<p>Users have complete freedom to use any affiliate links when creating looks and have all rights for commisions.</p>
					<p>Eastyler may work with affiliate networks and advertising networks to sustain Eastyler to function.</p>
					<h2>Copyrights</h2>
					<p>Users have all rights for their created content on Eastyler.</p>
					<p>Eastyler may use crawelled content from the web and provides direct linkage to the orignial content. Any mis-use shall be discontinued.</p>
				</div>
			)
			break;
		case 'contact':
			content = (
				<div>
					<h1>Contact Us</h1>
					<p>eastyler.com@gmail.com</p>
				</div>
			)
			break;
		case 'about': 
		default:
			content = (
				<div>
					<h1>About Us</h1>
					<p>Eastyler is a social platform built for fashion lovers.</p>
					<p>We use technology to:</p>
					<ul>
						<li>
							<p>help influencers curate and manage fashion looks.</p> 
						</li>
						<li>
							<p>help influencers to reach their audience.</p> 
						</li>
						<li>
							<p>help fashion lovers to get inspirations.</p> 
						</li>
						<li>
							<p>revolutionize the way people shop for fashion.</p> 
						</li>
					</ul>
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