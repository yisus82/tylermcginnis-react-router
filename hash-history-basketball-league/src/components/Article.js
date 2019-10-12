import React from 'react';
import PropTypes from 'prop-types';
import { getArticle } from '../api';

const Article = ({ teamId, articleId }) => {
  const [article, setArticle] = React.useState(null);

  const { id, title, body } = article || {};

  /**
   * Fetches an article from a given team
   * @param {string} tId Team Id
   * @param {string} artId Article Id
   */
  const fetchArticle = (tId, artId) => {
    setArticle(null);

    getArticle(tId, artId).then(newArticle => setArticle(newArticle));
  };

  React.useEffect(() => fetchArticle(teamId, articleId), [teamId, articleId]);

  if (article && !id) {
    return (
      <div className="panel">
        <h1 className="text-align-center">Article not found</h1>
      </div>
    );
  }

  return !article ? (
    <div className="panel">
      <h1 className="text-align-center">LOADING</h1>
    </div>
  ) : (
    <div className="panel">
      <article className="article" key={id}>
        <h1 className="header">{title}</h1>
        <p>{body}</p>
      </article>
    </div>
  );
};

Article.propTypes = {
  teamId: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
};

export default Article;
