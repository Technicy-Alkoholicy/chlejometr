import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './reducers/index.js';

import LoginPage from './components/LoginPage/LoginPage.jsx';
import StartPage from './components/StartPage/StartPage.jsx';
import ProfilePage from './components/ProfilePage/ProfilePage.jsx';
import MainPage from './components/MainPage/MainPage.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import SummaryPage from './components/SummaryPage/SummaryPage.jsx';
import FriendsPage from './components/FriendsPage/FriendsPage.jsx';

import './style.sass';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        {/* <Route exact path="/" component={StartPage} /> */}
        <Route path="/profile" component={ProfilePage} />
        <Route path="/main" component={MainPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/summary" component={SummaryPage} />
        <Route path="/friends" component={FriendsPage} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
