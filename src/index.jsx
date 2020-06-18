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
import FriendSearch from './components/pop-ups/FriendSearch/FriendSearch.jsx';
import FriendInvite from './components/pop-ups/InviteToParty/InviteToParty.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';

import './style.sass';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/search" component={FriendSearch} />
        <Route exact path="/invite" component={FriendInvite} />
        {/* <Route exact path="/" component={StartPage} /> */}
        <Route path="/profile" component={ProfilePage} />
        <Route path="/main" component={MainPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/summary" component={SummaryPage} />
        <Route path="/friends" component={FriendsPage} />
        <Route path="/error" component={ErrorPage} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
