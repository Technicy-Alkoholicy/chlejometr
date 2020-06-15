import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
// import { } from '../../../actions';

import './partyCreate.sass';

class PartyCreate extends React.Component {
  state = {};

  render() {
    const {} = this.state;
    return (
      <>
        <div className="partyCreate"></div>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PartyCreate);
