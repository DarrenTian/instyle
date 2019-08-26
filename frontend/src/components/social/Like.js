import React from "react";
import PropTypes from "prop-types";
import { userService, socialService } from "../../services";

import LoginModalGroup from "components/element/LoginModalGroup";

class Like extends React.Component {
	state = {
		login: false,
        liked: this.props.look.liked,
    };

    cancel = ()=> {
    	this.setState({login:false});
    }

    toggleLike = ()=>{
        if (!userService.isLoggedIn()) {
        	this.setState({login:true});
            return;
        }

        const likeState = this.state.liked;
        socialService.toggleLike(this.props.look.url_id, likeState)
            .then(response =>{
                this.setState({liked:!likeState});
            })
            .catch(e => {
                this.setState({liked:likeState});
            });
    }
    render() {
    	const loveStyle = {
            fontSize: "25px",
            marginTop: "-4px",
            display: "block",
        }
        const lovedStyle = {
            fontSize: "25px",
            marginTop: "-4px",
            display: "none",
            color: "#F04857",
        }
        if (this.state.liked) {
        	loveStyle.display = "none";
            lovedStyle.display = "block";
        } else {
            lovedStyle.display = "none";
            loveStyle.display = "block";      
        }
        return (
	    	<div>
		        <div style={loveStyle} className="is-clickable" onClick={this.toggleLike} >
		            <i className="far fa-heart"></i>
		        </div>
		        <div style={lovedStyle} className="is-clickable" onClick={this.toggleLike}>
		            <i className="fas fa-heart"></i>
		        </div>
		        {this.state.login && 
		        	<LoginModalGroup {...this.props} initialState={"login"} cancel={this.cancel}/>
		        }
	        </div>
        )
    }
}

export default Like

