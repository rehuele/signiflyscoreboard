(function () {
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $010b7f8c4bd70a87$exports = {};
$010b7f8c4bd70a87$exports = JSON.parse('{"fsconfig":{"number_teams":8,"number_players":2},"teams":[{"name":"West Ham","players":["Yaya Toure","Andres Iniesta"],"image":{"src":"assets/img/football-logos/logo-west-ham-united.png","alt":"west ham united logo"}},{"name":"Chelsea","players":["Ashley Cole","Philipp Lahm"],"image":{"src":"assets/img/football-logos/logo-chelsea.png","alt":"chelsea logo"}},{"name":"PSG","players":["Lionel Messi","Gerard Pique"],"image":{"src":"assets/img/football-logos/logo-psg.png","alt":"psg logo"}},{"name":"Arsenal","players":["Xavi","Radamel Falcao"],"image":{"src":"assets/img/football-logos/logo-arsenal.png","alt":"arsenal logo"}},{"name":"Copenhagen","players":["Luis Suarez","Neymar"],"image":{"src":"assets/img/football-logos/logo-copenhagen.png","alt":"copenhagen logo"}},{"name":"Manchester","players":["David Silva","Zlatan Ibrahimovic"],"image":{"src":"assets/img/football-logos/logo-manchester-city.png","alt":"manchester city logo"}},{"name":"Bayern","players":["Edinson Cavani","Gianluigi Buffon"],"image":{"src":"assets/img/football-logos/logo-bayern-munchen.png","alt":"bayern munich logo"}},{"name":"Newcastle","players":["Cristiano Ronaldo"],"image":{"src":"assets/img/football-logos/logo-newcastle-united.png","alt":"newcastle united logo"}}],"matches":[{"matchId":1,"team1":"West Ham","team2":"Chelsea","scoreTeam1":1,"scoreTeam2":2},{"matchId":2,"team1":"West Ham","team2":"PSG","scoreTeam1":5,"scoreTeam2":1},{"matchId":3,"team1":"Copenhagen","team2":"Chelsea","scoreTeam1":4,"scoreTeam2":4},{"matchId":4,"team1":"West Ham","team2":"Arsenal","scoreTeam1":3,"scoreTeam2":1},{"matchId":5,"team1":"Bayern","team2":"Newcastle","scoreTeam1":3,"scoreTeam2":7}]}');


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
const $c274fa293841a670$var$fsMatches = document.querySelector(".fs-matches");
const $c274fa293841a670$var$fsScoreboard = document.querySelector(".fs-scoreboard");
const $c274fa293841a670$var$fsMenu = document.querySelector(".fs-menu");
const $c274fa293841a670$var$btnAdmin = document.querySelector(".btn-admin");
let $c274fa293841a670$var$matchList = [];
// Save JSON to Local Storage
const $c274fa293841a670$var$jsonFile = localStorage.getItem("fsjson");
if ($c274fa293841a670$var$jsonFile === null) localStorage.setItem("fsjson", JSON.stringify((0, (/*@__PURE__*/$parcel$interopDefault($010b7f8c4bd70a87$exports)))));
const $c274fa293841a670$var$fifasignifly = JSON.parse(localStorage.getItem("fsjson"));
$c274fa293841a670$var$matchList.push(...$c274fa293841a670$var$fifasignifly.matches);
// JSON Data
const { fsconfig: $c274fa293841a670$var$fsconfig  } = $c274fa293841a670$var$fifasignifly;
// Config
const { number_teams: $c274fa293841a670$var$nbrTeams , number_players: $c274fa293841a670$var$nbrPlayers  } = $c274fa293841a670$var$fsconfig;
// Display Matches
function $c274fa293841a670$var$displayMatches() {
    const teamsList = $c274fa293841a670$var$fifasignifly.teams;
    let gameList = [];
    $c274fa293841a670$var$matchList.forEach((match)=>{
        const { matchId: matchId , team1: team1 , team2: team2 , scoreTeam1: scoreTeam1 , scoreTeam2: scoreTeam2  } = match;
        // Returns Corresponding Team
        function isTeamName1(equipe) {
            return equipe.name === team1;
        }
        function isTeamName2(equipe) {
            return equipe.name === team2;
        }
        // Config nbrPlayers: Iterate Players List
        function listItem(players) {
            let playersList = "";
            for(let i = 0; i < $c274fa293841a670$var$nbrPlayers; i++)playersList += `<li>${players[i] ? players[i] : ""}</li>`;
            return playersList;
        }
        let teamName1Index = teamsList.findIndex(isTeamName1);
        let teamName2Index = teamsList.findIndex(isTeamName2);
        gameList += `
      <div class="fs-match" data-match="${matchId}">
        <div class="fs-match__header">
          <h3 class="fs-match__number">Match ${matchId < 10 ? "0" + matchId : matchId}</h3>
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
    $c274fa293841a670$var$fsMatches.innerHTML = gameList;
}
// Sliding Menu
function $c274fa293841a670$var$slideMenu() {
    $c274fa293841a670$var$fsMenu.addEventListener("click", function(e) {
        e.preventDefault();
        document.body.classList.toggle("is-active");
    });
}
// Update Scores
function $c274fa293841a670$var$updateScore(dataId, scoreTeam, scoreTeamValue) {
    const res = $c274fa293841a670$var$matchList.findIndex((match)=>match.matchId == dataId.dataset.match);
    const name = scoreTeam.name;
    const item = {
        [name]: parseInt(scoreTeamValue)
    };
    const currentMatchList = Object.assign($c274fa293841a670$var$matchList[res], item);
    const keyfifasignifly = $c274fa293841a670$var$fifasignifly["matches"];
    const source = Object.assign(keyfifasignifly, $c274fa293841a670$var$matchList);
    localStorage.setItem("fsjson", JSON.stringify($c274fa293841a670$var$fifasignifly));
    $c274fa293841a670$var$calculateLeaderboard();
}
function $c274fa293841a670$var$handleInput(e) {
    const input = e.target;
    const inputValue = e.target.value;
    const parentId = e.target.closest(".fs-match");
    $c274fa293841a670$var$updateScore(parentId, input, inputValue);
}
// Calculate Leaderboard
function $c274fa293841a670$var$calculateLeaderboard() {
    const leaderboard = [];
    $c274fa293841a670$var$fifasignifly.matches.forEach((match, index)=>{
        const team1Index = leaderboard.findIndex((team)=>team.id === match.team1);
        const team2Index = leaderboard.findIndex((team)=>team.id === match.team2);
        const isTeam1Win = match.scoreTeam1 > match.scoreTeam2;
        const isTeam1Loss = match.scoreTeam1 < match.scoreTeam2;
        const isTeam1Tie = match.scoreTeam1 === match.scoreTeam2;
        if (team1Index !== -1) {
            if (isTeam1Win) leaderboard[team1Index].wins++;
            if (isTeam1Loss) leaderboard[team1Index].loss++;
            if (isTeam1Tie) leaderboard[team1Index].ties++;
        } else leaderboard.push({
            id: match.team1,
            wins: isTeam1Win ? 1 : 0,
            ties: isTeam1Tie ? 1 : 0,
            loss: isTeam1Loss ? 1 : 0,
            points: isTeam1Win || isTeam1Tie ? match.scoreTeam1 : 0
        });
        const isTeam2Win = match.scoreTeam2 > match.scoreTeam1;
        const isTeam2Loss = match.scoreTeam2 < match.scoreTeam1;
        const isTeam2Tie = match.scoreTeam2 === match.scoreTeam1;
        if (team2Index !== -1) {
            if (isTeam2Win) leaderboard[team2Index].wins++;
            if (isTeam2Loss) leaderboard[team2Index].loss++;
            if (isTeam2Tie) leaderboard[team2Index].ties++;
        } else leaderboard.push({
            id: match.team2,
            wins: isTeam2Win ? 1 : 0,
            ties: isTeam2Tie ? 1 : 0,
            loss: isTeam2Loss ? 1 : 0,
            points: isTeam2Win || isTeam2Tie ? match.scoreTeam2 : 0
        });
    });
    // Calculate Total Points in Leaderboard
    // Win = 3 Points
    // Tie = 1 Point
    // Loss = 0 Points
    leaderboard.forEach((leader)=>{
        leader.points = leader.wins * 3 + leader.ties;
    });
    // Sort First to Last Team
    const sortedLeaderboard = leaderboard.sort((teamA, teamB)=>teamA.points < teamB.points ? 1 : teamA.points > teamB.points ? -1 : 0);
    // Config nbrTeams: Limit number of Teams Shown
    const splicedSortedLeaderboard = sortedLeaderboard.slice(0, $c274fa293841a670$var$nbrTeams);
    $c274fa293841a670$var$displayLeaderboard(splicedSortedLeaderboard);
}
// Display Leaderboard
function $c274fa293841a670$var$displayLeaderboard(sortedLeaderboard) {
    const scoreboardList = sortedLeaderboard.map((team, index)=>`<div class="table-row">
        <div class="fixed-col">${index + 1}</div>
        <div>${team.id}</div>
        <div>${team.wins}</div>
        <div>${team.ties}</div>
        <div>${team.loss}</div>
        <div>${team.points}</div>
      </div>`).join("");
    const scoreboardHeader = `
    <div class="table-wrapper">
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
    $c274fa293841a670$var$fsScoreboard.innerHTML = scoreboardHeader;
}
$c274fa293841a670$var$displayMatches();
$c274fa293841a670$var$calculateLeaderboard();
$c274fa293841a670$var$slideMenu();
// Lock Inputs
$c274fa293841a670$var$btnAdmin.addEventListener("click", function(e) {
    e.preventDefault();
    const scoreInputs = document.querySelectorAll(".fs-matches input");
    scoreInputs.forEach((scoreInput)=>{
        scoreInput.disabled = !scoreInput.disabled;
    });
});
$c274fa293841a670$var$fsMatches.addEventListener("input", $c274fa293841a670$var$handleInput);

})();
