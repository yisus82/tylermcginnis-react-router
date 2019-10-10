import {
  teams,
  players,
  generateArticle,
  generateTeamsArticles,
} from './dummy-data';

let cachedPlayers = null;
let cachedTeams = null;

/**
 * Gets players from a team or all of them if no teamId was given
 * @param {string} teamId Team Id
 */
const getPlayers = teamId =>
  new Promise(res => {
    if (!cachedPlayers) {
      cachedPlayers = players;
      return setTimeout(
        () => res(teamId ? teams[teamId].players : cachedPlayers),
        800
      );
    }
    return res(teamId ? teams[teamId].players : cachedPlayers);
  });

/**
 * Gets the teams
 */
const getTeams = () =>
  new Promise(res => {
    if (cachedTeams === null) {
      cachedTeams = teams;
      return setTimeout(() => res(cachedTeams), 400);
    }
    return res(cachedTeams);
  });

/**
 * Gets an article
 * @param {string} teamId Team id
 * @param {string} articleId
 */
const getArticle = (teamId, articleId) =>
  new Promise(res => {
    setTimeout(() => res(generateArticle(teamId, articleId)), 700);
  });

/**
 * Gets the articles for a given team
 * @param {string} teamId Team Id
 */
const getTeamsArticles = teamId =>
  new Promise(res => {
    setTimeout(() => res(generateTeamsArticles(teamId)), 700);
  });

export { getPlayers, getTeams, getArticle, getTeamsArticles };
