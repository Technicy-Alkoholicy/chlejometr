import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { checkIsUserLogged, finishParty, leaveParty } from '../../actions';

import Nav from '../common/Nav/Nav.jsx';

import './summaryPage.sass';

class SummaryPage extends React.Component {
  state = {
    isHost: true,
    partyCreated: null,
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

  convertDateFormat = dateString => {
    if (dateString) {
      const date = new Date(dateString);
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getYear() + 1900}`;
    }
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
                <p className="summaryPage__p">
                  {this.convertDateFormat(this.props.party.createdDate)}
                </p>
              </div>
              <div className="summaryPage__row">
                <p className="summaryPage__p">Start</p>
                <p className="summaryPage__p">
                  {this.convertDateFormat(this.props.party.startedDate)}
                </p>
              </div>
              <div className="summaryPage__row">
                <p className="summaryPage__p">Finished</p>
                <p className="summaryPage__p">
                  {this.convertDateFormat(this.props.party.finishedDate) || '---'}
                </p>
              </div>
              <div className="summaryPage__row">
                <p className="summaryPage__p">Participants</p>
                <p className="summaryPage__p">{this.props.party?.membersShots?.length}</p>
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
              {this.props.party.membersShots.map(participant => (
                <div className="summaryPage__row">
                  <div className="summaryPage__p">{participant.user.username}</div>
                  <div className="summaryPage__p summaryPage__p--small">
                    {participant.shots.length}
                  </div>
                  <div className="summaryPage__p summaryPage__p--small">{(() => {
                    let numOfMl = 0
                    participant.shots.forEach(shot => numOfMl += shot.size);
                    return numOfMl
                  })()}</div>
                </div>
              )
              )}
            </div>
          </section>

          {isHost &&
            !this.props.user.parties[
              this.props.user.parties.findIndex(
                party => party._id === this.props.user.currentPartyId
              )
            ].isPartyOver && (
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
          {isHost &&
            !this.props.user.parties[
              this.props.user.parties.findIndex(party => party._id === this.props.user.currentPartyId)
            ].isPartyOver ? (
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
              <button
                className="summaryPage__btn"
                onClick={() => {
                  this.props.leaveParty(
                    this.props.user.currentPartyId,
                    this.props.history,
                    this.props.user.parties
                  );
                }}
              >
                Leave party
              </button>
            )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user, party }) => ({ user, party });
const mapDispatchToProps = { checkIsUserLogged, finishParty, leaveParty };

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
