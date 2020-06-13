import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
// import {  } from '../../actions';

import Nav from '../common/Nav/Nav.jsx';

import './homePage.sass';

class HomePage extends React.Component {
  state = {
    parties: [
      { name: 'testowa impreza', isPartyOver: false, id: 0 },
      { name: 'zakończona impreza', isPartyOver: true, id: 1 },
      { name: 'testowa impreza2', isPartyOver: true, id: 2 }
    ],
    activeParties: [],
    finishedParties: [],
    newParty: [{ name: '', isPartyOver: false, id: undefined }],
    isNewPartyAdded: false
  };

  componentDidMount() {
    this.divideParties();
  }

  delParty = id => {
    const { state } = this;
    state.parties.splice(
      state.parties.findIndex(party => {
        party.id === id;
      }),
      1
    );

    this.setState({ state });
    this.divideParties();
  };

  divideParties = () => {
    const { state } = this;
    const parties = this.state.parties;
    const aParties = [];
    const fParties = [];

    parties.forEach(party => {
      if (party.isPartyOver) fParties.push(party);
      else aParties.push(party);
    });

    state.activeParties = aParties;
    state.finishedParties = fParties;

    this.setState({ state });
  };

  chageNameParty = e => {
    const { state } = this;
    state.newParty.name = e;
    this.setState({ state });
  };
  addParty = () => {
    const { state } = this;

    const parties = state.parties.sort((a, b) => {
      return a.id - b.id;
    });
    const index = parties.length - 1;
    state.newParty.id = parties[index].id + 1;
    state.parties.push(state.newParty);
    state.newParty = [{ name: '', isPartyOver: false, id: undefined }];
    state.isNewPartyAdded = false;

    this.divideParties();
    this.setState({ state });
  };

  render() {
    const { activeParties, finishedParties, isNewPartyAdded, newParty } = this.state;
    return (
      <>
        <div className="homePage">
          <Nav page="HomePage" />

          <section className="homePage__section">
            <h2 className="homePage__h2">Active Parties</h2>

            {activeParties.map(party => (
              <div className="homePage__party">
                <p className="homePage__p">{party.name}</p>
                <button className="homePage__btn">
                  <i className="fas fa-arrow-right homePage__icon"></i>
                </button>
              </div>
            ))}

            {isNewPartyAdded && (
              <div className="homePage__party">
                <input
                  type="text"
                  className="homePage__input"
                  value={newParty.name}
                  onChange={e => {
                    this.chageNameParty(e.target.value);
                  }}
                />
                <button
                  className="homePage__btn"
                  onClick={() => {
                    this.addParty();
                  }}
                >
                  <i className="fas fa-check homePage__icon"></i>
                </button>
              </div>
            )}

            <button
              className="homePage__btn homePage__addBtn"
              onClick={() => {
                this.setState({ isNewPartyAdded: true });
              }}
            >
              <i className="fas fa-plus homePage__icon"></i>
            </button>
          </section>

          <section className="homePage__section">
            <h2 className="homePage__h2">Finished Parties</h2>

            {finishedParties.length ? (
              finishedParties.map(party => (
                <div className="homePage__party">
                  <button
                    className="homePage__btn"
                    onClick={() => {
                      this.delParty(party.id);
                    }}
                  >
                    <i className="fas fa-times homePage__icon"></i>
                  </button>
                  <p className="homePage__p">{party.name}</p>
                  <button className="homePage__btn">
                    <i className="fas fa-arrow-right homePage__icon"></i>
                  </button>
                </div>
              ))
            ) : (
              <div className="homePage__party">
                <p className="homePage__p homePage__longP">You don't have any finished parties.</p>
              </div>
            )}
          </section>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ gameData }) => ({ gameData });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
