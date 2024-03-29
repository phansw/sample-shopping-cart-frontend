/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - The Corner Bookstore"
      defaultTitle="The Corner Bookstore"
    >
      <meta name="description" content="Your local bookstore by the corner" />
    </Helmet>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
