import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
// import {  } from '../../actions';

import './profilePage.sass';

class ProfilePage extends React.Component {
  state = {
    email: { value: '', isActive: false },
    username: { value: '', isActive: false },
    password: { value: '', isActive: false },
    gender: { value: '', isActive: false },
    age: { value: null, isActive: false },
    height: { value: null, isActive: false },
    weight: { value: null, isActive: false }
  };

  isActiveToggle = type => {
    const { state } = this;
    state[type].isActive = !state[type].isActive;
    this.setState({ state });
  };

  valueChage = (e, type) => {
    const { state } = this;
    state[type].value = e;
    this.setState({ state });
  };

  render() {
    const { email, username, password, gender, age, height, weight } = this.state;
    return (
      <>
        <div className="profilePage">
          <section className="profilePage__section">
            <h2 className="profilePage__h2">Account Details</h2>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">E-mail</h3>
              <div className="profilePage__editPole">
                {email.isActive ? (
                  <input
                    type="text"
                    value={email.value}
                    className="profilePage__input"
                    onChange={e => {
                      this.valueChage(e.target.value, 'email');
                    }}
                  />
                ) : (
                  <p className="profilePage__input">{email.value}</p>
                )}

                <button
                  className="profilePage__btn"
                  onClick={() => {
                    this.isActiveToggle('email');
                  }}
                >
                  {/* icon edit */}
                  <i
                    className={`fas fa-pen profilePage__icon ${
                      !email.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                  {/* icon submit */}
                  <i
                    className={`fas fa-check profilePage__icon ${
                      email.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">Username</h3>
              <div className="profilePage__editPole">
                {username.isActive ? (
                  <input
                    type="text"
                    value={username.value}
                    className="profilePage__input"
                    onChange={e => {
                      this.valueChage(e.target.value, 'username');
                    }}
                  />
                ) : (
                  <p className="profilePage__input">{username.value}</p>
                )}

                <button
                  className="profilePage__btn"
                  onClick={() => {
                    this.isActiveToggle('username');
                  }}
                >
                  {/* icon edit */}
                  <i
                    className={`fas fa-pen profilePage__icon ${
                      !username.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                  {/* icon submit */}
                  <i
                    className={`fas fa-check profilePage__icon ${
                      username.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">Password</h3>
              <div className="profilePage__editPole">
                {password.isActive ? (
                  <input
                    type="text"
                    value={password.value}
                    className="profilePage__input"
                    onChange={e => {
                      this.valueChage(e.target.value, 'password');
                    }}
                  />
                ) : (
                  <p className="profilePage__input">{password.value}</p>
                )}

                <button
                  className="profilePage__btn"
                  onClick={() => {
                    this.isActiveToggle('password');
                  }}
                >
                  {/* icon edit */}
                  <i
                    className={`fas fa-pen profilePage__icon ${
                      !password.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                  {/* icon submit */}
                  <i
                    className={`fas fa-check profilePage__icon ${
                      password.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </section>

          <section className="profilePage__section">
            <h2 className="profilePage__h2">Personal Info</h2>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">Gender</h3>
              <div className="profilePage__editPole">
                {gender.isActive ? (
                  <input
                    type="text"
                    value={gender.value}
                    className="profilePage__input"
                    onChange={e => {
                      this.valueChage(e.target.value, 'gender');
                    }}
                  />
                ) : (
                  <p className="profilePage__input">{gender.value}</p>
                )}

                <button
                  className="profilePage__btn"
                  onClick={() => {
                    this.isActiveToggle('gender');
                  }}
                >
                  {/* icon edit */}
                  <i
                    className={`fas fa-pen profilePage__icon ${
                      !gender.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                  {/* icon submit */}
                  <i
                    className={`fas fa-check profilePage__icon ${
                      gender.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">Age</h3>
              <div className="profilePage__editPole">
                {age.isActive ? (
                  <input
                    type="number"
                    value={age.value}
                    className="profilePage__input"
                    onChange={e => {
                      this.valueChage(e.target.value, 'age');
                    }}
                  />
                ) : (
                  <p className="profilePage__input">{age.value}</p>
                )}

                <button
                  className="profilePage__btn"
                  onClick={() => {
                    this.isActiveToggle('age');
                  }}
                >
                  {/* icon edit */}
                  <i
                    className={`fas fa-pen profilePage__icon ${
                      !age.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                  {/* icon submit */}
                  <i
                    className={`fas fa-check profilePage__icon ${
                      age.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">Height (cm)</h3>
              <div className="profilePage__editPole">
                {height.isActive ? (
                  <input
                    type="number"
                    value={height.value}
                    className="profilePage__input"
                    onChange={e => {
                      this.valueChage(e.target.value, 'height');
                    }}
                  />
                ) : (
                  <p className="profilePage__input">{height.value}</p>
                )}

                <button
                  className="profilePage__btn"
                  onClick={() => {
                    this.isActiveToggle('height');
                  }}
                >
                  {/* icon edit */}
                  <i
                    className={`fas fa-pen profilePage__icon ${
                      !height.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                  {/* icon submit */}
                  <i
                    className={`fas fa-check profilePage__icon ${
                      height.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">Weight (kg)</h3>
              <div className="profilePage__editPole">
                {weight.isActive ? (
                  <input
                    type="number"
                    value={weight.value}
                    className="profilePage__input"
                    onChange={e => {
                      this.valueChage(e.target.value, 'weight');
                    }}
                  />
                ) : (
                  <p className="profilePage__input">{weight.value}</p>
                )}

                <button
                  className="profilePage__btn"
                  onClick={() => {
                    this.isActiveToggle('weight');
                  }}
                >
                  {/* icon edit */}
                  <i
                    className={`fas fa-pen profilePage__icon ${
                      !weight.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                  {/* icon submit */}
                  <i
                    className={`fas fa-check profilePage__icon ${
                      weight.isActive ? 'profilePage__icon--active' : ''
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
