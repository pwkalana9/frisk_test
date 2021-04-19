/*App.js*/
import React, { Component } from "react";
import "./App.css";
import App from "./App";
import AppList from "./AppList";

//Import all needed Component for this tutorial
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NotFoundRoute,
  Link,
  Redirect
} from "react-router-dom";

//Here we switch the URL requests into different React components.
function Navigation() {
    return (
        <main>
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/list" component={AppList} />
            </Switch>
        </main>
    )
}

export default Navigation;