import Console from "./Console";
import Doc from "./Doc";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import ReactDOM from "react-dom";
import Signup from "./Signup";
import StyleDataProvider from "./StyleDataProvider";
import Style from "./Style";
import { userService } from "../services";
import Welcome from "./Welcome";
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
		  <div>
		    <Header isLoggedIn={ this.state.isLoggedIn }/>
		    <BrowserRouter>
		      <Switch>
		        <Route path="/welcome" exact component={Welcome} />
		        <Route path="/doc/:topic" component={Doc} />
		        {process.env.PROD_ENV == "DEV" && <Route path="/login" render={()=><Login loginHandler={this.login} />} />}
		        {process.env.PROD_ENV == "DEV" && <Route path="/signup" render={()=><Signup loginHandler={this.login} />} />}
		        {process.env.PROD_ENV == "DEV" && <PrivateRoute path="/console" component={Console} />}
		        {process.env.PROD_ENV == "DEV" && <Route path="/style/:id" component={StylePage} />}
		        <Redirect to="/welcome" />
		      </Switch>
		    </BrowserRouter>
		    <Footer />
		  </div>
		)
	}
}

const StylePage = ({ match }) => (
  <StyleDataProvider endpoint={"/api/styles/" + match.params.id + "/?format=json"} render={style => <Style style={style} />} />
  // TODO: <StyleListDataProvider>, can reuse the same template but call different apis to retrieve data, for example, "more from", "similiar looks" ...
);

const wrapper = document.getElementById("instyle-spa");
wrapper ? ReactDOM.render(<App />, wrapper) : null;