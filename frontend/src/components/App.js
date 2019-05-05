import React from "react";
import ReactDOM from "react-dom";
import StyleDataProvider from "./StyleDataProvider";
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
  <StyleDataProvider endpoint={"/api/styles/" + match.params.id +"/?format=json"} render={style => <Style style={style} />} />
  // TODO: <StyleListDataProvider>, can reuse the same template but call different apis to retrieve data, for example, "more from", "similiar looks" ...
);

const wrapper = document.getElementById("instyle-spa");
wrapper ? ReactDOM.render(<App />, wrapper) : null;