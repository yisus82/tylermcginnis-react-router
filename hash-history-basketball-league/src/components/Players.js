import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import { parse } from 'qs';
import slug from 'slug';
import { getPlayers } from '../api';
import Sidebar from './Sidebar';

const Players = props => {
  const [state, setState] = React.useState({
    players: [],
    loading: true,
  });
  const { players, loading } = state;
  const { match, location } = props;

  /**
   * Fetches players from a given team
   * @param {string} [teamId] Team Id
   */
  const fetchPlayers = teamId => {
    getPlayers(teamId).then(teamPlayers =>
      setState(() => ({
        loading: false,
        players: teamPlayers,
      }))
    );
  };

  React.useEffect(
    () =>
      location.search
        ? fetchPlayers(parse(location.search.slice(1)).teamId)
        : fetchPlayers(),
    [location.search]
  );

  return (
    <div className="container two-column">
      <Sidebar
        loading={loading}
        title="Players"
        list={players.map(player => player.name)}
        {...props}
      />
      {!loading && location.pathname === '/players' ? (
        <div className="sidebar-instruction">Select a Player</div>
      ) : null}
      <Route
        path={`${match.url}/:playerId`}
        render={routeProps => {
          if (loading) {
            return null;
          }

          const {
            name,
            position,
            teamId,
            number,
            avatar,
            apg,
            ppg,
            rpg,
            spg,
          } = players.find(
            player => slug(player.name) === routeProps.match.params.playerId
          );

          return (
            <div className="panel">
              <img
                className="avatar"
                src={`${avatar}`}
                alt={`${name}'s avatar`}
              />
              <h1 className="medium-header">{name}</h1>
              <h3 className="header">#{number}</h3>
              <div className="row">
                <ul className="info-list" style={{ marginRight: 80 }}>
                  <li>
                    Team
                    <div>
                      <Link style={{ color: '#68809a' }} to={`/${teamId}`}>
                        {teamId[0].toUpperCase() + teamId.slice(1)}
                      </Link>
                    </div>
                  </li>
                  <li>
                    Position<div>{position}</div>
                  </li>
                  <li>
                    PPG<div>{ppg}</div>
                  </li>
                </ul>
                <ul className="info-list">
                  <li>
                    APG<div>{apg}</div>
                  </li>
                  <li>
                    SPG<div>{spg}</div>
                  </li>
                  <li>
                    RPG<div>{rpg}</div>
                  </li>
                </ul>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

Players.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default Players;
