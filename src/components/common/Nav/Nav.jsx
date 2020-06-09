import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
// import {  } from '../../actions';

import './nav.sass';

class Nav extends React.Component {
  render() {
    return (
      <>
        <nav className="nav">
          <ul className="nav__ul">
            {this.props.gameData.isLogged ? (
              <>
                <li className="nav__li">
                  <Link className="nav__a" to={`/`}>
                    Start
                  </Link>
                </li>
                <li className="nav__li">
                  <Link className="nav__a" to={`/home`}>
                    Home
                  </Link>
                </li>
                <li className="nav__li">
                  <Link className="nav__a" to={`/profile`}>
                    Profile
                  </Link>
                </li>
                <li className="nav__li">
                  <Link className="nav__a" to={`/login`}>
                    Log In
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav__li">
                  <Link className="nav__a" to={`/about`}>
                    Home
                  </Link>
                </li>
                <li className="nav__li">
                  <Link className="nav__a" to={`/login`}>
                    Log In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </>
    );
  }
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
