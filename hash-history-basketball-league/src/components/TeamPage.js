import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getTeam, getTeamArticles } from '../api';
import TeamInfo from './TeamInfo';

const TeamPage = ({ match }) => {
  const [state, setState] = React.useState({
    loading: true,
    team: {},
    articles: undefined,
  });

  const { loading, team, articles } = state;
  const { teamId } = match.params;

  /**
   * Fetches a team
   * @param {string} id Team Id
   */
  const fetchTeam = id => {
    Promise.all([getTeam(id), getTeamArticles(id)]).then(
      ([newTeam, newArticles]) => {
        setState(() => ({
          team: newTeam,
          articles: newArticles,
          loading: false,
        }));
      }
    );
  };

  React.useEffect(() => fetchTeam(teamId), [teamId]);

  if (!loading && !team) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <TeamInfo team={team} articles={articles} match={match} />
    </div>
  );
};

TeamPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default TeamPage;
