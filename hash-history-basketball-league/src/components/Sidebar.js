import React from 'react';
import PropTypes from 'prop-types';
import slug from 'slug';
import CustomLink from './CustomLink';

const Sidebar = ({ title, list, loading, location, match }) =>
  loading === true ? (
    <h1>LOADING</h1>
  ) : (
    <div>
      <h3 className="header">{title}</h3>
      <ul className="sidebar-list">
        {list.map(item => (
          <CustomLink
            key={item}
            to={{
              pathname: `${match.url}/${slug(item)}`,
              search: location.search,
            }}
          >
            {item.toUpperCase()}
          </CustomLink>
        ))}
      </ul>
    </div>
  );

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
};

export default Sidebar;
