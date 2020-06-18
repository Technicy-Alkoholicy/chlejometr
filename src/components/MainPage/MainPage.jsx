import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getInfoAboutCurrentParty, updateShotData, checkIsUserLogged } from '../../actions';

import Nav from '../common/Nav/Nav.jsx';

import './mainPage.sass';

class MainPage extends React.Component {
  state = {
    percent: { value: '40', isActive: false },
    milliliters: { value: '50', isActive: false },
    shotsCounter: 0,
    alcoholDrunk: 0,
    isNextShotReady: true,
    isDataFetched: false
  };

  componentDidMount() {
    this.props.checkIsUserLogged(this.props.history);
    if (!this.props.user.currentPartyId) this.props.history.push('/home');
  }

  componentDidUpdate() {
    if (!this.state.isDataFetched && this.props.user.username) {
      if (!this.props.user.currentPartyId) this.props.history.push('/home');
      this.props.getInfoAboutCurrentParty(
        this.props.user.currentPartyId,
        this.props.user.username,
        70,
        'male'
      );

      this.setState({ isDataFetched: true });
    }
  }

  isActiveToggle = type => {
    const state = { ...this.state };
    state[type].isActive = !state[type].isActive;
    this.setState(state);
  };

  valueChage = (e, type) => {
    const state = { ...this.state };

    if (e < 0) e = 0;
    else if (type === 'milliliters') {
      if (e > 1000) e = 1000;
      e = Math.floor(e);
    } else if (e > 100) e = 100;

    state[type].value = e;
    this.setState(state);
  };

  chillUpTimer = () => {
    setTimeout(() => {
      this.setState({ isNextShotReady: true });
    }, 10000);
  };

  nextShot = () => {
    const state = { ...this.state };
    if (state.percent.value && state.milliliters.value && state.isNextShotReady) {
      state.isNextShotReady = false;
      this.chillUpTimer();

      this.props.updateShotData(
        this.props.party.currentPartyId,
        state.milliliters.value,
        state.percent.value,
        this.props.user.username
      );

      this.setState(state);
    }
  };

  // convertDateFormat = dateString => {
  //   if (dateString) {
  //     const date = new Date(dateString);
  //     return `${date.getDate()}.${date.getMonth() + 1}.${date.getYear() +
  //       1900} ${dateString.getHours()} ${dateString.getMinutes()}`;
  //   }
  // };

  render() {
    const { percent, milliliters, shotsCounter, alcoholDrunk } = this.state;
    return (
      <>
        <div className="mainPage">
          <Nav page="MainPage" />
          <section className="mainPage__topSection">
            <h1 className="mainPage__h1">Drink Up!</h1>
            <h3 className="mainPage__h3">Party name: {this.props.party.name}</h3>
            <div className="mainPage__settings">
              <div className="mainPage__module">
                <p className="mainPage__p">Alcohol %</p>

                <div className="mainPage__editPole">
                  {percent.isActive ? (
                    <input
                      type="number"
                      value={percent.value}
                      className="mainPage__input"
                      onChange={e => {
                        this.valueChage(e.target.value, 'percent');
                      }}
                    />
                  ) : (
                    <p className="mainPage__input">{percent.value}</p>
                  )}
                  <p className="mainPage__unitP">%</p>

                  <button
                    className="mainPage__btn"
                    onClick={() => {
                      this.isActiveToggle('percent');
                    }}
                  >
                    {/* icon edit */}
                    <i
                      className={`fas fa-pen mainPage__icon ${
                        !percent.isActive ? 'mainPage__icon--active' : ''
                      }`}
                    ></i>
                    {/* icon submit */}
                    <i
                      className={`fas fa-check mainPage__icon ${
                        percent.isActive ? 'mainPage__icon--active' : ''
                      }`}
                    ></i>
                  </button>
                </div>
              </div>

              <div className="mainPage__module">
                <p className="mainPage__p">Glass volume</p>
                <div className="mainPage__editPole">
                  {milliliters.isActive ? (
                    <input
                      type="number"
                      value={milliliters.value}
                      className="mainPage__input"
                      onChange={e => {
                        this.valueChage(e.target.value, 'milliliters');
                      }}
                    />
                  ) : (
                    <p className="mainPage__input">{milliliters.value}</p>
                  )}
                  <p className="mainPage__unitP">ml</p>

                  <button
                    className="mainPage__btn"
                    onClick={() => {
                      this.isActiveToggle('milliliters');
                    }}
                  >
                    {/* icon edit */}
                    <i
                      className={`fas fa-pen mainPage__icon ${
                        !milliliters.isActive ? 'mainPage__icon--active' : ''
                      }`}
                    ></i>
                    {/* icon submit */}
                    <i
                      className={`fas fa-check mainPage__icon ${
                        milliliters.isActive ? 'mainPage__icon--active' : ''
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <button
            className="mainPage__mainBtn"
            onClick={() => {
              if (
                !this.props.user.parties[
                  this.props.user.parties.findIndex(
                    party => party._id === this.props.user.currentPartyId
                  )
                ].isPartyOver
              )
                this.nextShot();
              this.props.getInfoAboutCurrentParty(
                this.props.user.currentPartyId,
                this.props.user.username,
                70,
                'male'
              );
              console.log('onClick');
            }}
          ></button>

          <section className="mainPage__bottomSection">
            <h2 className="mainPage__h2">Estimate Statistics</h2>
            <div className="mainPage__bottomSectionMain">
              <div className="mainPage__row">
                <p className="mainPage__bottomSectionP">Shots/Drinks</p>
                <p className="mainPage__bottomSectionP">
                  {this.props.party.membersShots?.[
                    this.props.party.membersShots.findIndex(
                      member => member.user.username === this.props.user.username
                    )
                  ].shots.length
                    ? this.props.party.membersShots[
                        this.props.party.membersShots.findIndex(
                          member => member.user.username === this.props.user.username
                        )
                      ].shots.length
                    : 0}
                </p>
              </div>
              <div className="mainPage__row">
                <p className="mainPage__bottomSectionP">Etanol drunk</p>
                <p className="mainPage__bottomSectionP">{`${this.props.party.alcoholDrunk}ml`}</p>
              </div>
              <div className="mainPage__row">
                <p className="mainPage__bottomSectionP">Alcohol in blood</p>
                <p className="mainPage__bottomSectionP">{`${this.props.party.alcoholInBood}‰`}</p>
              </div>
              <div className="mainPage__row">
                <p className="mainPage__bottomSectionP">Time to sober</p>
                <p className="mainPage__bottomSectionP">{`~${this.props.party.timeToSober}h`}</p>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ party, user }) => ({ party, user });
const mapDispatchToProps = { getInfoAboutCurrentParty, updateShotData, checkIsUserLogged };

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
