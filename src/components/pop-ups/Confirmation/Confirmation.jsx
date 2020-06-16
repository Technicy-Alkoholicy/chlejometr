import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
// import { } from '../../../actions';

import './confirmation.sass';

class Confirmation extends React.Component {
  state = {};

  render() {
    const {} = this.state;
    return (
      <>
        <div className="confirmation"></div>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
