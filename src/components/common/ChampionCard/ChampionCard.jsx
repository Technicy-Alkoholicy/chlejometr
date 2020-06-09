import React from 'react';

import { connect } from 'react-redux';
// import {  } from '../../actions';

import './championCard.sass';

import defaultImg from '../../../img/default.png';

class ChampionCard extends React.Component {
  render() {
    return (
      <>
        <div className="championCard">
          <img src={defaultImg} className="championCard__img" />
          <p className="championCard__p">{this.props.name}</p>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChampionCard);
