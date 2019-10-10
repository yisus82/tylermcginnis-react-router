import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { getTeams } from '../api';
import Sidebar from './Sidebar';
import Team from './Team';

const Teams = ({ match, location }) => {
  const [state, setState] = React.useState({
    teams: [],
    loading: true,
  });
  const { teams, loading } = state;

  React.useEffect(() => {
    getTeams().then(newTeams => {
      setState(() => ({
        loading: false,
        teams: newTeams,
      }));
    });
  }, []);

  return (
    <div className="container two-column">
      <Sidebar
        loading={loading}
        title="Teams"
        list={Object.keys(teams)}
        match={match}
        location={location}
      />
      {!loading && location.pathname === '/teams' ? (
        <div className="sidebar-instruction">Select a Team</div>
      ) : null}
      <Route
        path={`${match.url}/:teamId`}
        render={routeProps =>
          loading ? null : (
            <div className="panel">
              <Team team={teams[routeProps.match.params.teamId]} />
            </div>
          )
        }
      />
    </div>
  );
};

Teams.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default Teams;
