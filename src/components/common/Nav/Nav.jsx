import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { logOut } from '../../../actions';

import './nav.sass';

class Nav extends React.Component {
  nav = () => {
    switch (this.props.page) {
      case 'MainPage':
        return (
          <>
            <ul className="nav__ul">
              <li className="nav__li">
                <Link className="nav__a nav__a--MainPage" to={`/home`}>
                  Home
                </Link>
              </li>
              <li className="nav__li">
                <Link className="nav__a nav__a--MainPage" to={`/summary`}>
                  Summary
                </Link>
              </li>
            </ul>

            <div className="nav__horizontalLine nav__horizontalLine--MainPage"></div>
            <div className="nav__verticalLine nav__verticalLine--MainPage"></div>
          </>
        );
      case 'ProfilePage':
        return (
          <>
            <ul className="nav__ul">
              <li className="nav__li">
                <Link className="nav__a nav__a--ProfilePage" to={`/home`}>
                  Home
                </Link>
              </li>
              <li className="nav__li">
                <Link
                  className="nav__a nav__a--ProfilePage"
                  to={`/`}
                  onClick={() => {
                    this.props.logOut();
                  }}
                >
                  Log Out
                </Link>
              </li>
            </ul>

            <div className="nav__horizontalLine nav__horizontalLine--ProfilePage"></div>
            <div className="nav__verticalLine nav__verticalLine--ProfilePage"></div>
          </>
        );
      case 'HomePage':
        return (
          <>
            <ul className="nav__ul">
              <li className="nav__li">
                <Link className="nav__a nav__a--HomePage" to={`/profile`}>
                  Profile
                </Link>
              </li>
              <li className="nav__li">
                <Link className="nav__a nav__a--HomePage" to={`/friends`}>
                  Friends
                </Link>
              </li>
            </ul>

            <div className="nav__horizontalLine nav__horizontalLine--HomePage"></div>
            <div className="nav__verticalLine nav__verticalLine--HomePage"></div>
          </>
        );
      case 'SummaryPage':
        return (
          <>
            <ul className="nav__ul">
              <li className="nav__li">
                <Link className="nav__a nav__a--SummaryPage" to={`/home`}>
                  Home
                </Link>
              </li>
              <li className="nav__li">
                <Link className="nav__a nav__a--SummaryPage" to={`/main`}>
                  DRINK UP!
                </Link>
              </li>
            </ul>

            <div className="nav__horizontalLine nav__horizontalLine--SummaryPage"></div>
            <div className="nav__verticalLine nav__verticalLine--SummaryPage"></div>
          </>
        );
      case 'FriendsPage':
        return (
          <>
            <ul className="nav__ul">
              <li className="nav__li">
                <Link className="nav__a nav__a--FriendsPage" to={`/profile`}>
                  Profile
                </Link>
              </li>
              <li className="nav__li">
                <Link className="nav__a nav__a--FriendsPage" to={`/home`}>
                  Home
                </Link>
              </li>
            </ul>

            <div className="nav__horizontalLine nav__horizontalLine--FriendsPage"></div>
            <div className="nav__verticalLine nav__verticalLine--FriendsPage"></div>
          </>
        );
      default:
        return <p>Nav error (bad: this.props.page)</p>;
    }
  };

  render() {
    return (
      <>
        <nav className="nav">{this.nav()}</nav>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { logOut };

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
