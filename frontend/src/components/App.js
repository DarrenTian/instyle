import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect
} from "react-router-dom";
import queryString from 'query-string';

import About from "components/page/About";
import Console from "components/page/Console";
import Doc from "components/page/Doc";
import ErrorPage from "components/page/ErrorPage";
import Explore from "components/page/Explore";
import Following from "components/page/Following";
import Footer from "components/element/Footer";
import Header from "components/element/Header";
import Login from "components/page/Login";
import LookPage from "components/page/LookPage";
import LookEditPage from "components/page/LookEditPage";
import PrivateRoute from "components/module/PrivateRoute";
import Profile from "components/page/Profile";
import Signup from "components/page/Signup";
import Trending from "components/page/Trending";
import UserProfilePage from "components/page/UserProfilePage";
import { userUtil } from "services";
import "./styles.scss";

class App extends React.Component {
	state = {
		isLoggedIn: userUtil.isLoggedIn(),
	}

	login = () => {
		this.setState({
			isLoggedIn: true,
		});
	}

	render() {
		return (
		  <div className="main-canvas">
		    <Header isLoggedIn={ this.state.isLoggedIn } />
		    <div className="canvas-component">
			    <BrowserRouter>
			      <Switch>
			      	<Route path="/" exact render={()=><Explore loginHandler={this.login} />} />
			      	<Route path="/about" exact component={About} />
			        <Route path="/creator" exact component={About} />
			        <Route path="/doc/:topic" component={Doc} />
			        <Route path="/login" render={()=><Login loginHandler={this.login} />} />
			        <Route path="/signup" render={()=><Signup loginHandler={this.login} />} />
			        <Route exact path="/looks/:id" render={(props)=><LookPage {...props} preview={false} loginHandler={this.login} />} />
			        <Route exact path="/looks/:id/preview" render={(props)=><LookPage {...props} preview={true} loginHandler={this.login} />} />
			        <Route path="/users/:id" render={(props)=><UserProfilePage {...props} loginHandler={this.login} />} />
			        <PrivateRoute exact path="/looks/:id/edit" component={LookEditPage} />
			        <PrivateRoute path="/console" component={Console} />
			        <PrivateRoute path="/profile" component={Profile} />
			        <PrivateRoute path="/following" component={Following} />
			        <PrivateRoute path="/trending" component={Trending} />
			        <Route path="/error" exact component={ErrorPage} />
			        <Redirect to="/error" />
			      </Switch>
			    </BrowserRouter>
		    </div>
		    <Footer />
		  </div>
		)
	}
}

const wrapper = document.getElementById("instyle-spa");
wrapper ? ReactDOM.render(<App />, wrapper) : null;