import React from 'react';
import { Route, Switch } from "react-router-dom";
import HeaderTop from './Components/Header/Header';
import MenuBar from './Components/Header/Index';
import routes from "./Routes/Index";
const DefaultRoutes = (props) => {
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
        <div className="row">
            <div className="col-xl-2"><MenuBar /></div>
            <div className="col-xl-10">
                <HeaderTop />
                <Switch>{show(routes)}</Switch>
            </div>
        </div>
    );
}

export default DefaultRoutes;