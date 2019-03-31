import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Style from "./Style";

const App = () => (
  <DataProvider endpoint="/api/style/1" render={style => <Style style={style} />} />
);
const wrapper = document.getElementById("instyle-spa");
wrapper ? ReactDOM.render(<App />, wrapper) : null;