import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import './InviteToParty.sass';

class InviteToParty extends React.Component {
  state = {
    link: 'http://drinkup.com/laksd23',
    isFriendSelected: false,
    isSelected: [false, false, false, false],
    results: ['lipa', 'lipson', 'lipacipa', 'lipnik']
  };

  render() {
    const { link, isFriendSelected, isSelected, results } = this.state;
    return (
      <>
        <div className="friendInvite">
          <div className="friendInvite__titleContainer">
            <p className="friendInvite__title">Invite to party</p>
          </div>
          <div className="friendInvite__inviteLinkContainer">
            <div className="friendInvite__inviteLinkTitleContainer">
              <p className="friendInvite__inviteLinkTitle">Invitation link</p>
            </div>
            <p className="friendInvite__inviteLink">{link}</p>
          </div>
          <div className="friendInvite__friends">
            <div className="friendInvite__friendsTitleContainer">
              <p className="friendInvite__friendsTitle">Friends</p>
            </div>
            <div className="friendInvite__friendsContainer">
              <ul className="friendInvite__friendsList">
                {results.map((result, index) => (
                  <li
                    key={index}
                    className={
                      isSelected[index]
                        ? 'friendInvite__friend friendInvite__friend--selected'
                        : 'friendInvite__friend'
                    }
                    onClick={e => {
                      const state = { ...this.state };
                      state.isFriendSelected = true;
                      this.setState(state);
                    }}
                  >
                    <p className="friendInvite__friendNickname">{results[index]}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="friendInvite__buttons">
            <button
              className={`friendInvite__inviteButton ${
                isFriendSelected ? '' : 'friendInvite__inviteButton--unactive'
              }`}
            >
              Invite
            </button>
            <button className="friendInvite__exitButton">Exit</button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InviteToParty);
