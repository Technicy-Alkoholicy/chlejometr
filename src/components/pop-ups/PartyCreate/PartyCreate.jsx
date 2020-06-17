import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
// import { } from '../../../actions';

import './partyCreate.sass';

class PartyCreate extends React.Component {
  state = {
    today: new Date(),
    dd: 0,
    mm: 0,
    yyyy: 0
  };
  date = () => {
    const state = { ...this.state };

    state.dd = state.today.getDate();
    state.mm = state.today.getMonth() + 1;
    state.yyyy = state.today.getFullYear();

    this.setState({ ...state });
  };

  componentDidMount = () => {
    this.date();
  };

  render() {
    return (
      <>
        <div className="partyCreate">
          <div className="partyCreate__container">
            <h1 className="partyCreate__h1">Create your party</h1>
            <div className="partyCreate__inputContainer">
              <p className="partyCreate__p">Party name</p>
              <input className="partyCreate__input" type="text" />
            </div>
            <div className="partyCreate__inputContainer">
              <p className="partyCreate__p">Party start date</p>
              <input
                className="partyCreate__input"
                type="date"
                min={`${this.state.yyyy}-${this.state.mm}-${this.state.dd}`}
                max={`${this.state.yyyy + 1}-${this.state.mm}-${this.state.dd}`}
              />
            </div>
            <div className="partyCreate__buttons">
              <button className="partyCreate__button">Save</button>
              <button className="partyCreate__button">Cancel</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PartyCreate);
