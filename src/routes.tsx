import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/homeView";
import Auth from "./components/auth/authView";
import Reading from "./components/readingView";
import Book from "./components/bookView";
import Profile from "./components/profileView";
import Search from "./components/searchView";
import Publishing from "./components/publishingView";
import ChapterNew from "./components/chapterPublishing";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Auth} />
    <Route exact path="/reading" component={Reading} />
    <Route exact path="/book" component={Book} />
    <Route exact path="/profile/:userId" component={Profile} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/publishing" component={Publishing} />
    <Route exact path="/new-chapter" component={ChapterNew} />
  </Switch>
);
