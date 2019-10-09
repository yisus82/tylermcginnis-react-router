import {
  teams,
  players,
  generateArticle,
  generateTeamsArticles,
} from './dummy-data';

let cachedPlayers = null;
const cachedTeams = {};
let cachedTeamNames = null;

/**
 * Gets players from a team
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
 * Gets a team
 * @param {string} teamId Team Id
 */
const getTeam = teamId =>
  new Promise(res => {
    if (typeof cachedTeams[teamId] === 'undefined') {
      cachedTeams[teamId] = teams[teamId];
      return setTimeout(() => res(cachedTeams[teamId]), 800);
    }
    return res(cachedTeams[teamId]);
  });

/**
 * Gets the teams' names
 */
const getTeamNames = () =>
  new Promise(res => {
    if (cachedTeamNames === null) {
      cachedTeamNames = Object.keys(teams);
      return setTimeout(() => res(cachedTeamNames), 400);
    }
    return res(cachedTeamNames);
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

export { getPlayers, getTeam, getTeamNames, getArticle, getTeamsArticles };
