import React from 'react';
import PropTypes from 'prop-types';
import {AuthorizationStatus} from './../../reducer/user/user.js';
import {Link} from 'react-router-dom';

import {Operation} from './../../reducer/data/data.js';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from './../../reducer/user/selectors.js';

const Header = (props) => {
  const {authorizationStatus, loadFavorite, userInfo} = props;
  const SERVER_URL = `https://4.react.pages.academy`;
  return (
    <header className='page-header movie-card__head'>
      <div className="logo">
        <Link
          className="logo__link"
          to='/'
        >
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="user-block">
        {authorizationStatus === AuthorizationStatus.AUTH
          ? <div className="user-block__avatar">
            <Link onClick={() => loadFavorite()} to='/mylist'><img src={`${SERVER_URL}${userInfo.avatar_url}`} alt="User avatar" width="63" height="63" /></Link>
          </div>
          : <Link to='/login' className="user-block__link">Sign in</Link>
        }
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  loadFavorite: PropTypes.func.isRequired,
  userInfo: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFavorite: () => {
      dispatch(Operation.loadFavorite());
    },
  };
};

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
