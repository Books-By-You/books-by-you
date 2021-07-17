import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/HomeView/homeView';
import Auth from './components/auth/authView';
import Reading from './components/ReadingView/readingView';
import Book from './components/BookView/bookView';
import Profile from './components/ProfileView/ProfileView';
import Search from './components/searchView/searchView';
import Publishing from './components/publishingView';
import ChapterNew from './components/chapterPublishing';

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/login' component={Auth} />
    <Route exact path='/reading' component={Reading} />
    <Route exact path='/book/:id' component={Book} />
    <Route exact path='/profile/:id' component={Profile} />
    <Route exact path='/search' component={Search} />
    <Route exact path='/publishing' component={Publishing} />
    <Route exact path='/new-chapter' component={ChapterNew} />
  </Switch>
);
