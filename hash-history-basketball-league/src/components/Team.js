import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TeamLogo from './TeamLogo';

const Team = ({ team }) => {
  const { id, name, established, manager, coach } = team;

  return (
    <div style={{ width: '100%' }}>
      <TeamLogo id={id} className="center" />
      <h1 className="medium-header">{name}</h1>
      <ul className="info-list row">
        <li>
          Established<div>{established}</div>
        </li>
        <li>
          Manager<div>{manager}</div>
        </li>
        <li>
          Coach<div>{coach}</div>
        </li>
      </ul>
      <Link className="center btn-main" to={`/${id}`}>
        {name} Team Page
      </Link>
    </div>
  );
};

Team.propTypes = {
  team: PropTypes.object.isRequired,
};

export default Team;
