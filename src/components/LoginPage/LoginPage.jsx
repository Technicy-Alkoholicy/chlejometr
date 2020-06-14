import React from 'react';
import { connect } from 'react-redux';

import { logIn, signUp } from '../../actions';

import beerLogo from '../../img/beerGlass.png';
import vodkaLogo from '../../img/vodkaShot.png';
import './LoginPage.sass';

class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    isActive: false
  };

  render() {
    const { username, password, email, isActive } = this.state;
    return (
      <>
        <div className="loginPage">
          <div className="loginPage__logo">
            <div className="loginPage__logo--left"></div>
            <h1 className="loginPage__title">DRINK UP</h1>
            <div className="loginPage__logo--right"></div>
          </div>
          <div className="loginPage__buttons">
            <button
              className={`loginPage__button loginPage__loginSectionButton ${
                !isActive ? 'loginPage__loginSectionButton--active' : ''
              }`}
              onClick={() => {
                this.setState({ isActive: false });
              }}
            >
              Log In
            </button>
            <button
              className={`loginPage__button loginPage__signupSectionButton ${
                isActive ? 'loginPage__signupSectionButton--active' : ''
              }`}
              onClick={() => {
                this.setState({ isActive: true });
              }}
            >
              Sign Up
            </button>
            <div className="loginPage__loginUnderlineSpace">
              <div
                className={`loginPage__loginUnderline ${
                  isActive ? 'loginPage__loginUnderline--active' : ''
                }`}
              ></div>
            </div>
          </div>
          <div className="loginPage__credentials">
            <div
              className={`loginPage__loginCredentials ${
                isActive ? 'loginPage__loginCredentials--active' : ''
              }`}
            >
              <p className="loginPage__text">Email</p>
              <input
                type="text"
                className="loginPage__loginInput"
                value={email}
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
              />
              <p className="loginPage__text">Password</p>
              <input
                type="password"
                className="loginPage__loginInput"
                value={password}
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
              />
              <button
                className="loginPage__loginButton"
                onClick={() => this.props.logIn(username, password)}
              >
                Log In
              </button>
            </div>
            <div
              className={`loginPage__signupCredentials ${
                isActive ? 'loginPage__signupCredentials--active' : ''
              }`}
            >
              <p className="loginPage__text">E-Mail</p>
              <input
                type="text"
                className="loginPage__signupInput"
                value={email}
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
              />
              <p className="loginPage__text">Username</p>
              <input
                type="text"
                className="loginPage__signupInput"
                value={username}
                onChange={e => {
                  this.setState({ username: e.target.value });
                }}
              />
              <p className="loginPage__text">Password</p>
              <input
                type="password"
                className="loginPage__signupInput"
                value={password}
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
              />
              <button
                className="loginPage__signupButton"
                onClick={() => {
                  this.props.signUp(username, email, password);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { logIn, signUp };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
