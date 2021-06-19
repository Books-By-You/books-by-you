import React from "react";
import { Switch, Route } from "react-router-dom";
import Home  from "./components/homeView"
import Auth from "./components/authView"
import Reading from "./components/readingView"
import Book from "./components/bookView"
import Profile from "./components/profileView"

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Auth} />
    <Route exact path="/reading" component={Reading} />
    <Route exact path="/book" component={Book} />
    <Route exact path="/profile" component={Profile} />
  </Switch>
);