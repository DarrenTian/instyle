import Console from "./Console";
import Doc from "./Doc";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import ReactDOM from "react-dom";
import Signup from "./Signup";
import LookDataProvider from "./LookDataProvider";
import LookEditPage from "./LookEditPage";
import Look from "./Look";
import { userService } from "../services";
import Welcome from "./Welcome";
import ErrorPage from "./ErrorPage";
import Profile from "./Profile";
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect
} from "react-router-dom";
import queryString from 'query-string';


class App extends React.Component {
	state = {
		isLoggedIn: userService.isLoggedIn(),
	}

	login = () => {
		this.setState({
			isLoggedIn: true,
		});
	}

	render() {
		const isLookView = window.location.pathname.includes("/looks/") && !window.location.pathname.includes("edit");
		return (
		  <div className="main-canvas">
		    <Header isLoggedIn={ this.state.isLoggedIn } isLookView={isLookView}/>
		    <div className="canvas-component">
			    <BrowserRouter>
			      <Switch>
			      	<Route path="/" exact component={Welcome} />
			        <Route path="/welcome" exact component={Welcome} />
			        <Route path="/doc/:topic" component={Doc} />
			        <Route path="/login" render={()=><Login loginHandler={this.login} />} />
			        <Route path="/signup" render={()=><Signup loginHandler={this.login} />} />
			        <PrivateRoute path="/console" component={Console} />
			        <PrivateRoute path="/profile" component={Profile} />
			        <Route exact path="/looks/:id" render={(props)=><LookPage {...props} preview={false} />} />
			        <Route exact path="/looks/:id/preview" render={(props)=><LookPage {...props} preview={true} />} />
			        <PrivateRoute exact path="/looks/:id/edit" component={LookEditPage} />
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
class LookPage extends React.Component {
	render() {
		return (
	  		<LookDataProvider lookId={this.props.match.params.id} preview={this.props.preview} render={look => <Look look={look} preview={this.props.preview} />} />
	   		// TODO: <StyleListDataProvider>, can reuse the same template but call different apis to retrieve data, for example, "more from", "similiar looks" ...
		);
	}

}

const wrapper = document.getElementById("instyle-spa");
wrapper ? ReactDOM.render(<App />, wrapper) : null;