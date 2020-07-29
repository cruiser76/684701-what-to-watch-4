import React from 'react';
import PropTypes from 'prop-types';
import {AuthorizationStatus} from './../../reducer/user/user.js';
import {Link} from 'react-router-dom';

const Header = (props) => {
  const {authorizationStatus} = props;
  return (
    <header className='page-header movie-card__head'>
      <div className="logo">
        <Link className="logo__link" to='/'>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="user-block">
        {authorizationStatus === AuthorizationStatus.AUTH
          ? <div className="user-block__avatar">
            <Link to='/mylist'><img src="img/avatar.jpg" alt="User avatar" width="63" height="63" /></Link>
          </div>
          : <Link to='/login' className="user-block__link">Sign in</Link>
        }
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default Header;
