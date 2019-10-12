import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import slug from 'slug';
import TeamLogo from './TeamLogo';
import Loading from './Loading';

const TeamInfo = ({ team, articles, match }) => {
  const {
    id,
    name,
    championships,
    established,
    manager,
    coach,
    wins,
    losses,
  } = team;

  return !articles ? (
    <div className="panel">
      <Loading />
    </div>
  ) : (
    <div className="panel">
      <TeamLogo id={id} />
      <h1 className="medium-header">{name}</h1>
      <h4 style={{ margin: 5 }}>
        <Link
          style={{ cursor: 'pointer' }}
          to={{ pathname: '/players', search: `?teamId=${id}` }}
        >
          View Roster
        </Link>
      </h4>
      <h4>Championships</h4>
      <ul className="championships">
        {championships.map(championship => (
          <li key={championship}>{championship}</li>
        ))}
      </ul>
      <ul className="info-list row" style={{ width: '100%' }}>
        <li>
          Established<div>{established}</div>
        </li>
        <li>
          Manager<div>{manager}</div>
        </li>
        <li>
          Coach<div>{coach}</div>
        </li>
        <li>
          Record
          <div>
            {wins}-{losses}
          </div>
        </li>
      </ul>
      <h2 className="header">Articles</h2>
      <ul className="articles">
        {articles.map(article => (
          <li key={article.id}>
            <Link to={`${match.url}/articles/${slug(article.title)}`}>
              <h4 className="article-title">{article.title}</h4>
              <div className="article-date">
                {article.date.toLocaleDateString()}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

TeamInfo.propTypes = {
  team: PropTypes.object,
  articles: PropTypes.array,
  match: PropTypes.object,
};

export default TeamInfo;
