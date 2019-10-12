import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { parse } from 'qs';
import slug from 'slug';
import { getPlayers } from '../api';
import Sidebar from './Sidebar';
import Player from './Player';

const Players = ({ match, location }) => {
  const [state, setState] = React.useState({
    players: [],
    loading: true,
  });
  const { players, loading } = state;

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
        match={match}
        location={location}
      />
      {!loading && location.pathname === '/players' ? (
        <div className="sidebar-instruction">Select a Player</div>
      ) : null}
      <Route
        path={`${match.url}/:playerId`}
        render={routeProps =>
          loading ? null : (
            <TransitionGroup className="panel">
              <CSSTransition key={location.key} classNames="fade" timeout={250}>
                <Player
                  player={players.find(
                    player =>
                      slug(player.name) === routeProps.match.params.playerId
                  )}
                />
              </CSSTransition>
            </TransitionGroup>
          )
        }
      />
    </div>
  );
};

Players.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default Players;
