import React from 'react';
import PropTypes from 'prop-types';

import {getYear as year} from './../../utils.js';

const Footer = (props) => {
  const {href} = props;
  return (
    <footer className="page-footer">
      <div className="logo">
        <a className="logo__link logo__link--light" href={href}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="copyright">
        <p>{`© ${year} What to watch Ltd.`}</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  href: PropTypes.string.isRequired
};

export default Footer;
