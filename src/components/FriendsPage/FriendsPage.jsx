import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { checkIsUserLogged, getUserInfo } from '../../actions';

import Nav from '../common/Nav/Nav.jsx';

import './friendsPage.sass';

class FriendsPage extends React.Component {
  state = {};

  componentDidMount = () => {
    this.props.checkIsUserLogged(this.props.history);
    if (!this.props.user.friends) this.props.getUserInfo();
  };

  //   componentDidUpdate() {
  //     if (this.props.user.email && !this.state.isDataFetched) {
  //       const state = { ...this.state };
  //       console.log(this.props.user);

  //       state.email.value = this.props.user.email;
  //       state.username.value = this.props.user.username;
  //       state.gender.value = this.props.user.gender;
  //       state.age.value = this.props.user.age;
  //       state.height.value = this.props.user.height;
  //       state.weight.value = this.props.user.weight;
  //       console.log(this.state);

  //       state.isDataFetched = true;

  //       this.setState(state);
  //     }
  //   }

  //   isActiveToggle = type => {
  //     const state = { ...this.state };
  //     state[type].isActive = !state[type].isActive;
  //     this.setState(state);
  //   };

  //   valueChage = (e, type) => {
  //     const state = { ...this.state };
  //     state[type].value = e;
  //     this.setState(state);
  //   };

  render() {
    return (
      <>
        <div className="friendsPage">
          <Nav page="FriendsPage" />

          <section className="friendsPage__section">
            <h2 className="friendsPage__h2">Friends</h2>

            {this.props.user.friends
              ? this.props.user.friends.map(friend => (
                  <div className="friendsPage__friend">
                    <button
                      className="friendsPage__btn"
                      // onClick={() => {
                      //   this.delParty(party.id);
                      // }}
                    >
                      <i className="fas fa-times friendsPage__icon"></i>
                    </button>
                    <p className="friendsPage__p">{friend.username}</p>
                    <button className="friendsPage__btn">
                      <i className="fas fa-arrow-right friendsPage__icon"></i>
                    </button>
                  </div>
                ))
              : ''}

            <button className="friendsPage__btn friendsPage__addBtn">
              <i className="fas fa-plus friendsPage__icon"></i>
            </button>
          </section>

          <section className="friendsPage__section">
            <h2 className="friendsPage__h2">Friend Requests</h2>

            {this.props.user.friendInvitations
              ? this.props.user.friendInvitations.map(friend => (
                  <div className="friendsPage__friend">
                    <button
                      className="friendsPage__btn"
                      // onClick={() => {
                      //   this.delParty(party.id);
                      // }}
                    >
                      <i className="fas fa-times friendsPage__icon"></i>
                    </button>
                    <p className="friendsPage__p">{friend.username}</p>
                    <button className="friendsPage__btn">
                      <i className="fas fa-check friendsPage__icon"></i>
                    </button>
                  </div>
                ))
              : ''}
          </section>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { checkIsUserLogged, getUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);
