import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';

const CustomLink = ({ to, children }) => (
  <Route path={to.pathname}>
    {({ match }) => (
      <li
        style={{
          listStyleType: 'none',
          fontWeight: match ? 'bold' : 'normal',
        }}
      >
        <Link to={to}>{children}</Link>
      </li>
    )}
  </Route>
);

CustomLink.propTypes = {
  to: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CustomLink;
