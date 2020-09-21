import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from './Components/Login/Index';
import DefaultLayout from './DefaultRoutes';
function App(props) {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/" component={DefaultLayout} />
    </Switch>
  );
}
export default App;
