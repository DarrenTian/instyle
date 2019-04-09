import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Style from "./Style";
import Welcome from "./Welcome"
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect
} from "react-router-dom";
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/welcome" exact component={Welcome} />
      <Route path="/style/:id" component={StylePage} />
      <Redirect to="/welcome" />
    </Switch>
  </BrowserRouter>
);

const StylePage = ({match}) => (
  <DataProvider endpoint={"/api/styles/" + match.params.id +"/?format=json"} render={style => <Style style={style} />} />
);

const wrapper = document.getElementById("instyle-spa");
wrapper ? ReactDOM.render(<App />, wrapper) : null;