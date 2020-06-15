import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getInfoAboutParties, createParty } from '../../actions';

import Nav from '../common/Nav/Nav.jsx';

import './homePage.sass';

class HomePage extends React.Component {
  state = {
    activeParties: [],
    finishedParties: [],
    newPartyName: '',
    isNewPartyAdded: false,
    isDataFetched: 0
  };

  componentDidMount = () => {
    this.props.getInfoAboutParties();
  };

  componentDidUpdate = () => {
    if (this.props.user.parties && !this.state.isDataFetched) {
      this.setState({
        parties: this.props.user.parties,
        isDataFetched: true,
        ...this.divideParties()
      });
    }
  };

  delParty = id => {
    const state = { ...this.state };
    state.parties.splice(
      state.parties.findIndex(party => {
        party.id === id;
      }),
      1
    );

    this.setState({ ...state, ...this.divideParties() });
  };

  divideParties = () => {
    const activeParties = [];
    const finishedParties = [];

    this.props.user.parties.forEach(party => {
      if (party.isPartyOver) finishedParties.push(party);
      else activeParties.push(party);
    });

    return {
      activeParties,
      finishedParties
    };
  };

  chageNameParty = e => {
    const state = { ...this.state };
    state.newPartyName = e;
    this.setState(state);
  };

  render() {
    const { activeParties, finishedParties, isNewPartyAdded, newPartyName } = this.state;
    return (
      <>
        <div className="homePage">
          <Nav page="HomePage" />

          <section className="homePage__section">
            <h2 className="homePage__h2">Active Parties</h2>

            {activeParties.map(party => (
              <div className="homePage__party">
                <p className="homePage__p">{party.name}</p>
                <Link to="/main" className="homePage__btn" onClick>
                  <i className="fas fa-arrow-right homePage__icon"></i>
                </Link>
              </div>
            ))}
            {isNewPartyAdded && (
              <div className="homePage__party">
                <input
                  type="text"
                  className="homePage__input"
                  value={newPartyName}
                  onChange={e => {
                    this.chageNameParty(e.target.value);
                  }}
                />
                <button
                  className="homePage__btn"
                  onClick={() => {
                    this.props.createParty(newPartyName);
                    this.setState({
                      activeParties: [
                        ...this.state.activeParties,
                        { name: this.state.newPartyName, isPartyOver: false }
                      ],
                      newPartyName: '',
                      isNewPartyAdded: false
                    });
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

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { getInfoAboutParties, createParty };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
