import React from 'react';

import { connect } from 'react-redux';
// import {  } from '../../actions';

import './StartPage.sass';

class StartPage extends React.Component {
  render() {
    return (
      <>
        <div className="StartPage">
          no siemaneczko
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
