import React from "react";
import PropTypes from "prop-types";

class SocialPlugin extends React.Component {
	// TODO: Get data into the share link so the shared info become rich.

	loadCopyScript = () => {
		const script = document.createElement("script");
	    script.src = "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.4/clipboard.min.js";
	    document.body.appendChild(script);

	    // TODO
	    // const inlineScript = document.createElement("script");
	    // inlineScript.innerHTML = "var clipboard = new ClipboardJS('.btn');"
	    // document.body.appendChild(inlineScript);
	}

	loadPinScript = () => {
		const script = document.createElement("script");
	    script.src = "//assets.pinterest.com/js/pinit.js";
	    script.async = true;
	    script.defer = true;
	    document.body.appendChild(script);
	}

	loadFbScript = () => {
		const script = document.createElement("script");
	    script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3&appId=231907500274418&autoLogAppEvents=1";
	    script.async = true;
	    script.defer = true;
	    script.crossorigin = "anonymous"
	    document.body.appendChild(script);
	}

	loadTwitterScript = () => {
		const script = document.createElement("script");
	    script.src = "https://platform.twitter.com/widgets.js";
	    script.async = true;
	    script.defer = true;
	    document.body.appendChild(script);
	}

	componentDidMount () {
		//this.loadCopyScript();
		this.loadPinScript();
		this.loadFbScript();
		this.loadTwitterScript();
	}

	render() {
		const socialPluginStyle = {
			height: "20px",
			lineHeight: "0",
		}
		const shareStyle = {
			paddingRight: "5px",
		}
		const linkStyle = {
			height: "20px",
			fontSize: "0.75rem",
			lineHeight: "0",
			textIndent: "10px",
		}

		return (
			<div className="is-flex" style={socialPluginStyle}>
				{/*
					<div style={shareStyle}><button style={linkStyle} className="btn button" data-clipboard-text="copied link"><i className="fas fa-link"></i>Share</button></div>
				*/}
		        <div style={shareStyle}><a data-pin-do="buttonBookmark" href="https://www.pinterest.com/pin/create/button/"></a></div>
		        <div style={shareStyle} className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Share</a></div>
		        <div><a className="twitter-share-button" href="https://twitter.com/intent/tweet">Tweet</a></div>
            </div>
		)
	}
}

export default SocialPlugin