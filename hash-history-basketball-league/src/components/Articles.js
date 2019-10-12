import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { getTeamArticles } from '../api';
import Sidebar from './Sidebar';
import Article from './Article';
import Loading from './Loading';

const Articles = ({ match, location }) => {
  const [state, setState] = React.useState({
    teamArticles: [],
    loading: true,
  });

  const { loading, teamArticles } = state;
  const { params, url } = match;
  const { teamId } = params;

  /**
   * Fetches articles from a given team
   * @param {string} id Team Id
   */
  const fetchTeamArticles = id => {
    getTeamArticles(id).then(articles => {
      setState({
        loading: false,
        teamArticles: articles.map(article => article.title),
      });
    });
  };

  React.useEffect(() => fetchTeamArticles(teamId), [teamId]);

  return loading ? (
    <Loading />
  ) : (
    <div className="container two-column">
      <Sidebar
        loading={loading}
        title="Articles"
        list={teamArticles}
        location={location}
        match={match}
      />
      <Route
        path={`${url}/:articleId`}
        render={routeProps => (
          <Article
            articleId={routeProps.match.params.articleId}
            teamId={teamId}
          />
        )}
      />
    </div>
  );
};

Articles.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default Articles;
