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
					<h2>Affiliate links</h2>
					<p>Users have complete freedom to use any affiliate links when creating looks and have all rights for commisions.</p>
					<h2>Ads</h2>
					<p>Eastyler may work with affiliate networks and advertising networks for profits and share profilts with content creators.</p>
					<h2>Copyrights</h2>
					<p>Users have all rights for their created content on Eastyler.</p>
					<p>By publishing on Eastyler platform, Eastyler also retains rights to publish user generated content on Eastyler-owned platforms.</p>
					<p>Eastyler works towards sharing benefits with content generaters.</p>
					<h2>Privacy Policy</h2>
					<p>Eastyler will store user's look data on creation and remove them on deletion.</p>
				</div>
			)
			break;
		case 'contact':
			content = (
				<div>
					<h1>Contact Us</h1>
					<p>Please send an email to contact_us@eastyler.com</p>
				</div>
			)
			break;
		case 'help':
			content = (
				<div>
					<h1>Technical Issues</h1>
					<p>Please send an email to contact_us@eastyler.com</p>
				</div>
			)
			break;
		case 'investor':
			content = (
				<div>
					<h1>Investor Relations</h1>
					<p>Please send an email to contact_us@eastyler.com</p>
				</div>
			)
			break;
		case 'about': 
		default:
			content = (
				<div>
					<h1>About Us</h1>
					<p>Eastyler is built for fashion lovers.</p>
					<p>We want to use technology to:</p>
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
					<p>We are a group of tech savvy in silicon valley who believe apparel shopping experience can be made different.</p>
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