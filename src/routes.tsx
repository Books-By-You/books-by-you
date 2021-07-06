<<<<<<< HEAD
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/homeView';
import Auth from './components/auth/authView';
import Reading from './components/readingView';
import Book from './components/bookView';
import Profile from './components/ProfileView/ProfileView';
import Search from './components/searchView/searchView';
import Publishing from './components/publishingView';
import ChapterNew from './components/chapterPublishing';

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/login' component={Auth} />
    <Route exact path='/reading' component={Reading} />
    <Route exact path='/book' component={Book} />
    <Route exact path='/profile/:id' component={Profile} />
    <Route exact path='/search' component={Search} />
    <Route exact path='/publishing' component={Publishing} />
    <Route exact path='/new-chapter' component={ChapterNew} />
=======
import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/homeView";
import Auth from "./components/auth/authView";
import Reading from "./components/readingView";
import Book from "./components/BookView/bookView";
import Profile from "./components/ProfileView/ProfileView";
import Search from "./components/searchView/searchView";
import Publishing from "./components/publishingView";
import ChapterNew from "./components/chapterPublishing";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Auth} />
    <Route exact path="/reading" component={Reading} />
    <Route exact path="/book/:id" component={Book} />
    <Route exact path="/profile/:id" component={Profile} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/publishing" component={Publishing} />
    <Route exact path="/new-chapter" component={ChapterNew} />
>>>>>>> d95311608317c2bee812d3cbf7cf86d80be9ab5c
  </Switch>
);
