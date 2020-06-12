import React from 'react';
import { connect } from 'react-redux';

import beerLogo from '../../img/beerGlass.png';
import vodkaLogo from '../../img/vodkaShot.png';
import './LoginPage.sass';

class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    email: ''
  };

  render() {
    const { username, password, email } = this.state;
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
              className="loginPage__button loginPage__loginSectionButton"
              onClick={e => {
                document.querySelector('.loginPage__loginCredentials').style.left = '0';
                document.querySelector('.loginPage__signupCredentials').style.left = '100vw';
                document.querySelector('.loginPage__loginUnderline').style.left = '0';
                document.querySelector('.loginPage__loginUnderline').style.backgroundColor =
                  '#3743B4';
                e.target.style.color = '#3743B4';
                document.querySelector('.loginPage__signupSectionButton').style.color = 'black';
              }}
            >
              Log In
            </button>
            <button
              className="loginPage__button loginPage__signupSectionButton"
              onClick={e => {
                document.querySelector('.loginPage__loginCredentials').style.left = '-100vw';
                document.querySelector('.loginPage__signupCredentials').style.left = '0';
                document.querySelector('.loginPage__loginUnderline').style.left = '50%';
                document.querySelector('.loginPage__loginUnderline').style.backgroundColor =
                  '#d4ad23';
                e.target.style.color = '#d4ad23';
                document.querySelector('.loginPage__loginSectionButton').style.color = 'black';
              }}
            >
              Sign Up
            </button>
            <div className="loginPage__loginUnderlineSpace">
              <div className="loginPage__loginUnderline"></div>
            </div>
          </div>
          <div className="loginPage__credentials">
            <div className="loginPage__loginCredentials">
              <p className="loginPage__text">Username</p>
              <input
                type="text"
                className="loginPage__loginInput"
                value={username}
                onChange={e => {
                  this.setState({ username: e.target.value });
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
              <button className="loginPage__loginButton">Log In</button>
            </div>
            <div className="loginPage__signupCredentials">
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
              <button className="loginPage__signupButton">Sign Up</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
