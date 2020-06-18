import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import './FriendSearch.sass';

class FriendSearch extends React.Component {
  state = {
    username: '',
    isNicknameSelected: false,
    isSelected: [false, false, false, false],
    results: ['lipa', 'lipson', 'lipacipa', 'lipnik'],
    selected: null
  };

  render() {
    const { username, isNicknameSelected, isSelected, results } = this.state;
    return (
      <>
        <div className="friendSearch">
          <div className="friendSearch__titleContainer">
            <p className="friendSearch__title">Search for friends</p>
          </div>
          <div className="friendSearch__searchInputContainer">
            <div className="friendSearch__searchInputTitleContainer">
              <p className="friendSearch__searchInputTitle">Username</p>
            </div>
            <input
              type="text"
              value={username}
              className="friendSearch__searchInput"
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
            />
          </div>
          <div className="friendSearch__searchResults">
            <div className="friendSearch__searchResultsTitleContainer">
              <p className="friendSearch__searchResultsTitle">Results</p>
            </div>
            <div className="friendSearch__searchResultsContainer">
              <ul className="friendSearch__searchResultsList">
                {results.map((result, index) => (
                  <li
                    key={index}
                    className={
                      isSelected[index]
                        ? 'friendSearch__searchResult friendSearch__searchResult--selected'
                        : 'friendSearch__searchResult'
                    }
                    onClick={e => {
                      const state = { ...this.state };
                      state.isNicknameSelected = true;
                      this.setState(state);
                    }}
                  >
                    <p className="friendSearch__searchResultNickname">{results[index]}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="friendSearch__buttons">
            <button
              className={`friendSearch__inviteButton ${
                isNicknameSelected ? '' : 'friendSearch__inviteButton--unactive'
              }`}
            >
              Invite
            </button>
            <button className="friendSearch__exitButton">Exit</button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FriendSearch);
