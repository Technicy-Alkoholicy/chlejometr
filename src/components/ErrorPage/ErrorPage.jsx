import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
// import { } from '../../../actions';

import './errorPage.sass';

class ErrorPage extends React.Component {
  state = {};
  render() {
    return (
      <>
        <div className="errorPage">
          <h1 className="errorPage__errorNumber">404</h1>
          <p className="errorPage__errorMessage">Page Not Found</p>
          <Link className="errorPage__button" to={'/home'}>
            Home Page
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
