import React from 'react';
import PropTypes from 'prop-types';
import {AuthorizationStatus} from './../../reducer/user/user.js';

const Header = (props) => {
  const {authorizationStatus, href} = props;
  return (
    <header className='page-header movie-card__head'>
      <div className="logo">
        <a className="logo__link" href={href}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="user-block">
        {authorizationStatus === AuthorizationStatus.AUTH
          ? <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
          : <a href="sign-in.html" className="user-block__link">Sign in</a>
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
