import data from './fifa-signifly.json';

// API Call
// URL: https://api.github.com/users/wesbos USER: wesbos or stolinski
// const baseEndpoint = 'https://api.github.com/';
// const usersEndpoint = `${baseEndpoint}/users`;

// async function getData(username) {
//   const response = await fetch(`${usersEndpoint}/${username}`);
//   const data = await response.json();
//   console.log(data);
// }

// function handleError(err) {
//   console.log(`Something went wrong: ${err}`);
// }

// getData('stolinski').catch(handleError);

/* 
1. Call API || Fetch JSON
2. Check if there is a JSON in localStorage use that else load local storage JSON
3. Display Matches
4. Calculate Leaderboard
5. Display Leaderboard results
6. Update Match scores
*/

const fsMatches = document.querySelector('.fs-matches');
const fsScoreboard = document.querySelector('.fs-scoreboard');
const fsMenu = document.querySelector('.fs-menu');
const btnAdmin = document.querySelector('.btn-admin');
let matchList = [];

// Save JSON to Local Storage
const jsonFile = localStorage.getItem('fsjson')
if (jsonFile === null) {
  localStorage.setItem('fsjson', JSON.stringify(data));
}

const fifasignifly = JSON.parse(localStorage.getItem('fsjson'));
matchList.push(...fifasignifly.matches);

// JSON Data
const { fsconfig } = fifasignifly;
// Config
const { number_teams: nbrTeams, number_players: nbrPlayers } = fsconfig;

// Display Matches
function displayMatches() {
  const teamsList = fifasignifly.teams;
  let gameList = [];

  matchList.forEach(match => {
    const { matchId, team1, team2, scoreTeam1, scoreTeam2 } = match;

    // Returns Corresponding Team
    function isTeamName1(equipe) {
      return equipe.name === team1;
    }

    function isTeamName2(equipe) {
      return equipe.name === team2;
    }

    // Config nbrPlayers: Iterate Players List
    function listItem(players) {
      let playersList = '';

      for (let i = 0; i < nbrPlayers; i++) {
        playersList += `<li>${players[i] ? players[i] : ''}</li>`;
      } 
      return playersList;
    }

    let teamName1Index = teamsList.findIndex(isTeamName1);
    let teamName2Index = teamsList.findIndex(isTeamName2);

    gameList += `
      <div class="fs-match" data-match="${matchId}">
        <div class="fs-match__header">
          <h3 class="fs-match__number">Match ${matchId < 10 ? '0' + matchId : matchId}</h3>
        </div>
        <div class="fs-match__content">
          <div class="fs-team fs-name__team-1">
            <div class="fs-team__logo">
              <img src="${teamsList[teamName1Index].image.src}" alt="${teamsList[teamName1Index].image.alt}">
            </div>
            <div>
              <h3 class="fs-team__name">${team1}</h3>
              <ul class="fs-team__players">${listItem(teamsList[teamName1Index].players)}</ul>
            </div>
            <input type="number" name="scoreTeam1" min="0" value="${scoreTeam1}" class="fs-team__score-1 scoreTeam1" disabled>
          </div>
          <div class="fs-team__divider"><span>:</span></div>
          <div class="fs-team fs-name__team-2">
            <div class="fs-team__logo">
              <img src="${teamsList[teamName2Index].image.src}" alt="${teamsList[teamName2Index].image.alt}">
            </div>
            <div>
              <h3 class="fs-team__name">${team2}</h3>
              <ul class="fs-team__players">${listItem(teamsList[teamName2Index].players)}</ul>
            </div>
            <input type="number" name="scoreTeam2" min="0" value="${scoreTeam2}" class="fs-team__score-2 scoreTeam2" disabled>
          </div>
        </div>
      </div>
    `;
  });
  fsMatches.innerHTML = gameList;
}

// Sliding Menu
function slideMenu() {
  fsMenu.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.toggle('is-active');
  });
}

// Update Scores
function updateScore(dataId, scoreTeam, scoreTeamValue) {
  const res = matchList.findIndex((match) => match.matchId == dataId.dataset.match);
  const name = scoreTeam.name;
  const item = {
    [name]: parseInt(scoreTeamValue)
  };

  const currentMatchList = Object.assign(matchList[res], item);
  const keyfifasignifly = fifasignifly['matches'];
  const source = Object.assign(keyfifasignifly, matchList);
  localStorage.setItem('fsjson', JSON.stringify(fifasignifly))
  calculateLeaderboard();
}

function handleInput(e) {
  const input = e.target;
  const inputValue = e.target.value;
  const parentId = e.target.closest('.fs-match');
  updateScore(parentId, input, inputValue);
}

// Calculate Leaderboard
function calculateLeaderboard() {
  leaderboard = [];

  fifasignifly.matches.forEach((match, index) => {
    const team1Index = leaderboard.findIndex((team) => team.id === match.team1);
    const team2Index = leaderboard.findIndex((team) => team.id === match.team2);

    const isTeam1Win = match.scoreTeam1 > match.scoreTeam2;
    const isTeam1Loss = match.scoreTeam1 < match.scoreTeam2;
    const isTeam1Tie = match.scoreTeam1 === match.scoreTeam2;

    if (team1Index !== -1) {
      if (isTeam1Win) {
        leaderboard[team1Index].wins++;
      }

      if (isTeam1Loss) {
        leaderboard[team1Index].loss++;
      }

      if (isTeam1Tie) {
        leaderboard[team1Index].ties++;
      }
    } else {
      leaderboard.push({
        id: match.team1,
        wins: isTeam1Win ? 1 : 0,
        ties: isTeam1Tie ? 1 : 0,
        loss: isTeam1Loss ? 1 : 0,
        points: isTeam1Win || isTeam1Tie ? match.scoreTeam1 : 0,
      });
    }

    const isTeam2Win = match.scoreTeam2 > match.scoreTeam1;
    const isTeam2Loss = match.scoreTeam2 < match.scoreTeam1;
    const isTeam2Tie = match.scoreTeam2 === match.scoreTeam1;

    if (team2Index !== -1) {
      if (isTeam2Win) {
        leaderboard[team2Index].wins++;
      }

      if (isTeam2Loss) {
        leaderboard[team2Index].loss++;
      }

      if (isTeam2Tie) {
        leaderboard[team2Index].ties++;
      }
    } else {
      leaderboard.push({
        id: match.team2,
        wins: isTeam2Win ? 1 : 0,
        ties: isTeam2Tie ? 1 : 0,
        loss: isTeam2Loss ? 1 : 0,
        points: isTeam2Win || isTeam2Tie ? match.scoreTeam2 : 0,
      });
    }
  });

  // Calculate Total Points in Leaderboard
  // Win = 3 Points
  // Tie = 1 Point
  // Loss = 0 Points
  leaderboard.forEach((leader) => {
    leader.points = (leader.wins * 3) + leader.ties;
  });

  // Sort First to Last Team
  const sortedLeaderboard = leaderboard.sort((teamA, teamB) => (teamA.points < teamB.points) ? 1 : (teamA.points > teamB.points) ? -1 : 0);
  
  // Config nbrTeams: Limit number of Teams Shown
  const splicedSortedLeaderboard = sortedLeaderboard.slice(0, nbrTeams);

  displayLeaderboard(splicedSortedLeaderboard);
}

// Display Leaderboard
function displayLeaderboard(sortedLeaderboard) {
  console.table(sortedLeaderboard);
  const scoreboardList = sortedLeaderboard
    .map(
      (team, index) => `<div class="table-row">
        <div class="fixed-col">${index +1}</div>
        <div>${team.id}</div>
        <div>${team.wins}</div>
        <div>${team.ties}</div>
        <div>${team.loss}</div>
        <div>${team.points}</div>
      </div>`
    )
    .join('');
  const scoreboardHeader = `
    <div class="table-wrap">
      <div class="table-grid fixed-header">
        <div class="table-header table-row">
          <div class="fixed-col">#</div>
          <div>Team</div>
          <div>W</div>
          <div>T</div>
          <div>L</div>
          <div>PTS</div>
        </div>
        ${scoreboardList}
      </div>
    </div>
  `;
fsScoreboard.innerHTML = scoreboardHeader;
}
displayMatches();
calculateLeaderboard();
slideMenu();

// Lock Inputs
btnAdmin.addEventListener('click', function(e) {
  e.preventDefault();

  const scoreInputs = document.querySelectorAll('.fs-matches input');
  scoreInputs.forEach(scoreInput => {
    scoreInput.disabled = !scoreInput.disabled;
  });
});

fsMatches.addEventListener('input', handleInput);