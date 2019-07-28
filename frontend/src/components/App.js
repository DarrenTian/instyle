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
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect
} from "react-router-dom";

class App extends React.Component {
	state = {
		isLoggedIn: userService.isLoggedIn(),
	}

	login = () => {
		this.setState({
			isLoggedIn: true,
		});
		console.log(this.state);
	}

	render() {
		return (
		  <div className="main-canvas">
		    <Header isLoggedIn={ this.state.isLoggedIn }/>
		    <div className="canvas-component">
			    <BrowserRouter>
			      <Switch>
			      	<Route path="/" exact component={Welcome} />
			        <Route path="/welcome" exact component={Welcome} />
			        <Route path="/doc/:topic" component={Doc} />
			        <Route path="/login" render={()=><Login loginHandler={this.login} />} />
			        <Route path="/signup" render={()=><Signup loginHandler={this.login} />} />
			        <PrivateRoute path="/console" component={Console} />
			        <Route exact path="/looks/:id" component={LookPage} />
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

const LookPage = ({ match }) => (
  <LookDataProvider lookId={match.params.id} render={look => <Look look={look} />} />
   // TODO: <StyleListDataProvider>, can reuse the same template but call different apis to retrieve data, for example, "more from", "similiar looks" ...
);

const wrapper = document.getElementById("instyle-spa");
wrapper ? ReactDOM.render(<App />, wrapper) : null;