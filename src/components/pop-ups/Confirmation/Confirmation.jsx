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
        <div className="confirmation">
          <div className="confirmation__container">
            <h1 className="confirmation__h1">Confirmation</h1>
            <p className="confirmation__p">Are you sure you want to...</p>
            <div className="confirmation__buttons">
              <button className="confirmation__button">YES</button>
              <button className="confirmation__button">NO</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
