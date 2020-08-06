import React from 'react';

import {getYear as year} from '../../utils.js';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="logo">
        <Link to='/' className="logo__link logo__link--light">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="copyright">
        <p>{`© ${year} What to watch Ltd.`}</p>
      </div>
    </footer>
  );
};

export default Footer;
