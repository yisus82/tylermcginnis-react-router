import React from 'react';
import { Link } from 'react-router-dom';
import { getTeams } from '../api';
import TeamLogo from './TeamLogo';

const Home = () => {
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

  return loading ? (
    <h1 className="text-center">LOADING</h1>
  ) : (
    <div className="container">
      <h1 className="large-header">Hash History Basketball League</h1>
      <h3 className="header text-center">Select a team</h3>
      <div className="home-grid">
        {Object.keys(teams).map(id => (
          <Link key={id} to={`/${id}`}>
            <TeamLogo id={id} width="125px" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
