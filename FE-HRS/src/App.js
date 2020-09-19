import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./Routes/Index";
import Header from "./Components/Header/Index";
import {Row,Col} from 'antd';
function App(props) {
  const show = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          ></Route>
        );
      });
    }
    return result;
  };
  return (
    <div>
       <BrowserRouter>
            <Switch>{show(routes)}</Switch>
          </BrowserRouter>
    </div>
  );
}
export default App;
