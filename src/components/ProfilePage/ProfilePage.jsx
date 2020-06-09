import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
// import {  } from '../../actions';

import './profilePage.sass';

class ProfilePage extends React.Component {
  render() {
    return (
      <>
        <div className="profilePage">
          <section className="profilePage__section">
            <h2 className="profilePage__h2">Account Details</h2>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">E-mail</h3>
              <div className="profilePage__editPole">
                <input type="text" className="profilePage__input" />
                <button className="profilePage__btn">
                  <i className="fas fa-pen"></i>
                </button>
              </div>
            </div>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">Username</h3>
              <div className="profilePage__editPole">
                <input type="text" className="profilePage__input" />
                <button className="profilePage__btn">
                  <i className="fas fa-pen"></i>
                </button>
              </div>
            </div>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">Password</h3>
              <div className="profilePage__editPole">
                <input type="password" className="profilePage__input" />
                <button className="profilePage__btn">
                  <i className="fas fa-pen"></i>
                </button>
              </div>
            </div>
          </section>

          <section className="profilePage__section">
            <h2 className="profilePage__h2">Personal Info</h2>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">Gender</h3>
              <div className="profilePage__editPole">
                <input type="text" className="profilePage__input" />
                <button className="profilePage__btn">
                  <i className="fas fa-pen"></i>
                </button>
              </div>
            </div>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">Age</h3>
              <div className="profilePage__editPole">
                <input type="text" className="profilePage__input" />
                <button className="profilePage__btn">
                  <i className="fas fa-pen"></i>
                </button>
              </div>
            </div>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">Height (cm)</h3>
              <div className="profilePage__editPole">
                <input type="text" className="profilePage__input" />
                <button className="profilePage__btn">
                  <i className="fas fa-pen"></i>
                </button>
              </div>
            </div>

            <div className="profilePage__module">
              <h3 className="profilePage__h3">Weight (kg)</h3>
              <div className="profilePage__editPole">
                <input type="text" className="profilePage__input" />
                <button className="profilePage__btn">
                  <i className="fas fa-pen"></i>
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
