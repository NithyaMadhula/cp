import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";

import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./components/Home";
import "./custom.css";
import "@progress/kendo-theme-bootstrap/dist/all.css";
import Analytics from "./features/analytics/Analytics";
import Featured from "./features/featured/Featured";
import Showroom from "./features/showroom/Showroom";
import PrivateRoute from "./PrivateRoute";

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/featured" component={Featured} />
        <PrivateRoute path="/showroom" component={Showroom} />
        <PrivateRoute path="/analytics" component={Analytics} />
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
            />
       
        {/* legacy routes, redirect to corresponding component to prevent blank/not found page UX. This needs to be integrated */}
        <Route exact path="/welcome" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/signin" component={Home} />
        <Route exact path="/logout" component={Home} />
        <PrivateRoute exact path="/featured-games" component={Featured} /> {/*this can be on the homepage*/}
        <PrivateRoute exact path="/dashboard" component={Analytics} />
        <PrivateRoute exact path="/games" component={Showroom} />
        {/* TODO:  routing */}
        <PrivateRoute exact path="/viewgame/:id*/" component={Showroom} />
        <PrivateRoute exact path="/advancedsearch" component={Showroom} />
        <PrivateRoute exact path="/searchresults" component={Showroom} />
        <PrivateRoute exact path="/favorites" component={Showroom} />
        <PrivateRoute exact path="/concepts" component={Showroom} />

        </Layout>

    );
  }
}
