import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { checkIsUserLogged, finishParty } from '../../actions';

import Nav from '../common/Nav/Nav.jsx';

import './summaryPage.sass';

class SummaryPage extends React.Component {
  state = {
    isHost: true,
    partyCreated: '13.06.2020',
    partyStart: '04.11.2020',
    partyFinished: '---',
    participants: [
      { name: 'Qler', numOfShots: 12, numOfml: 408 },
      { name: 'Duk', numOfShots: 9, numOfml: 2135 },
      { name: 'Cipson', numOfShots: 1, numOfml: 10 }
    ]
  };

  componentDidMount = () => {
    this.props.checkIsUserLogged(this.props.history);
  };

  render() {
    const { isHost, partyCreated, partyStart, partyFinished, participants } = this.state;
    return (
      <>
        <div className="summaryPage">
          <Nav page="SummaryPage" />

          <section className="summaryPage__section">
            <h2 className="summaryPage__h2">Party Details</h2>

            <div className="summaryPage__sectionMain">
              <div className="summaryPage__row">
                <p className="summaryPage__p">Created</p>
                <p className="summaryPage__p">{partyCreated}</p>
              </div>
              <div className="summaryPage__row">
                <p className="summaryPage__p">Start</p>
                <p className="summaryPage__p">{partyStart}</p>
              </div>
              <div className="summaryPage__row">
                <p className="summaryPage__p">Finished</p>
                <p className="summaryPage__p">{partyFinished}</p>
              </div>
              <div className="summaryPage__row">
                <p className="summaryPage__p">Participants</p>
                <p className="summaryPage__p">{participants.length}</p>
              </div>
            </div>
          </section>

          <section className="summaryPage__section">
            <h2 className="summaryPage__h2">Leaderboard</h2>
            <div className="summaryPage__sectionMain">
              <div className="summaryPage__row">
                <div className="summaryPage__p">Participant</div>
                <div className="summaryPage__p summaryPage__p--small">Shots</div>
                <div className="summaryPage__p summaryPage__p--small">ml</div>
              </div>
              {participants.map(participant => (
                <div className="summaryPage__row">
                  <div className="summaryPage__p">{participant.name}</div>
                  <div className="summaryPage__p summaryPage__p--small">
                    {participant.numOfShots}
                  </div>
                  <div className="summaryPage__p summaryPage__p--small">{participant.numOfml}</div>
                </div>
              ))}
            </div>
          </section>

          {isHost && (
            <section className="summaryPage__section">
              <h2 className="summaryPage__h2">Participants</h2>
              {participants.map((participant, index) => (
                <div className="summaryPage__participant">
                  <p className="summaryPage__participantP">{participant.name}</p>
                  <button className="summaryPage__participantBtn">
                    <i className="fas fa-times summaryPage__participantIcon"></i>
                  </button>
                </div>
              ))}
              <button className="summaryPage__participantBtn">
                <i className="fas fa-plus homePage__icon"></i>
              </button>
            </section>
          )}
          {isHost ? (
            <button
              className="summaryPage__btn"
              onClick={() => {
                this.props.finishParty(
                  this.props.user.currentPartyId,
                  this.props.history,
                  this.props.user.parties
                );
              }}
            >
              Finish party
            </button>
          ) : (
            <button className="summaryPage__btn">Leave party</button>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { checkIsUserLogged, finishParty };

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
