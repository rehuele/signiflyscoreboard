function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $6e61ae0b6a60f145$exports = {};
$6e61ae0b6a60f145$exports = JSON.parse('{"fsconfig":{"number_teams":8,"number_players":2},"teams":[{"name":"West Ham","players":["Yaya Toure","Andres Iniesta"],"image":{"src":"assets/img/football-logos/logo-west-ham-united.png","alt":"west ham united logo"}},{"name":"Chelsea","players":["Ashley Cole","Philipp Lahm"],"image":{"src":"assets/img/football-logos/logo-chelsea.png","alt":"chelsea logo"}},{"name":"PSG","players":["Lionel Messi","Gerard Pique"],"image":{"src":"assets/img/football-logos/logo-psg.png","alt":"psg logo"}},{"name":"Arsenal","players":["Xavi","Radamel Falcao"],"image":{"src":"assets/img/football-logos/logo-arsenal.png","alt":"arsenal logo"}},{"name":"Copenhagen","players":["Luis Suarez","Neymar"],"image":{"src":"assets/img/football-logos/logo-copenhagen.png","alt":"copenhagen logo"}},{"name":"Manchester","players":["David Silva","Zlatan Ibrahimovic"],"image":{"src":"assets/img/football-logos/logo-manchester-city.png","alt":"manchester city logo"}},{"name":"Bayern","players":["Edinson Cavani","Gianluigi Buffon"],"image":{"src":"assets/img/football-logos/logo-bayern-munchen.png","alt":"bayern munich logo"}},{"name":"Newcastle","players":["Cristiano Ronaldo"],"image":{"src":"assets/img/football-logos/logo-newcastle-united.png","alt":"newcastle united logo"}}],"matches":[{"matchId":1,"team1":"West Ham","team2":"Chelsea","scoreTeam1":1,"scoreTeam2":2},{"matchId":2,"team1":"West Ham","team2":"PSG","scoreTeam1":5,"scoreTeam2":1},{"matchId":3,"team1":"Copenhagen","team2":"Chelsea","scoreTeam1":4,"scoreTeam2":4},{"matchId":4,"team1":"West Ham","team2":"Arsenal","scoreTeam1":3,"scoreTeam2":1},{"matchId":5,"team1":"Bayern","team2":"Newcastle","scoreTeam1":3,"scoreTeam2":7}]}');


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
const $6db99e557c497bf6$var$fsMatches = document.querySelector(".fs-matches");
const $6db99e557c497bf6$var$fsScoreboard = document.querySelector(".fs-scoreboard");
const $6db99e557c497bf6$var$fsMenu = document.querySelector(".fs-menu");
const $6db99e557c497bf6$var$btnAdmin = document.querySelector(".btn-admin");
let $6db99e557c497bf6$var$matchList = [];
// Save JSON to Local Storage
const $6db99e557c497bf6$var$jsonFile = localStorage.getItem("fsjson");
if ($6db99e557c497bf6$var$jsonFile === null) localStorage.setItem("fsjson", JSON.stringify((0, (/*@__PURE__*/$parcel$interopDefault($6e61ae0b6a60f145$exports)))));
const $6db99e557c497bf6$var$fifasignifly = JSON.parse(localStorage.getItem("fsjson"));
$6db99e557c497bf6$var$matchList.push(...$6db99e557c497bf6$var$fifasignifly.matches);
// JSON Data
const { fsconfig: $6db99e557c497bf6$var$fsconfig  } = $6db99e557c497bf6$var$fifasignifly;
// Config
const { number_teams: $6db99e557c497bf6$var$nbrTeams , number_players: $6db99e557c497bf6$var$nbrPlayers  } = $6db99e557c497bf6$var$fsconfig;
// Display Matches
function $6db99e557c497bf6$var$displayMatches() {
    const teamsList = $6db99e557c497bf6$var$fifasignifly.teams;
    let tournamentList = [];
    $6db99e557c497bf6$var$matchList.forEach((match)=>{
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
            for(let i = 0; i < $6db99e557c497bf6$var$nbrPlayers; i++)playersList += `<li>${players[i] ? players[i] : ""}</li>`;
            return playersList;
        }
        let teamName1Index = teamsList.findIndex(isTeamName1);
        let teamName2Index = teamsList.findIndex(isTeamName2);
        tournamentList += `
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
            <input type="number" inputmode="numeric" name="scoreTeam1" min="0" value="${scoreTeam1 != "" || null ? scoreTeam1 : 0}" class="fs-team__score-1 scoreTeam1" disabled>
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
            <input type="number" inputmode="numeric" name="scoreTeam2" min="0" value="${scoreTeam2 != "" || null ? scoreTeam2 : 0}" class="fs-team__score-2 scoreTeam2" disabled>
          </div>
        </div>
      </div>
    `;
    });
    $6db99e557c497bf6$var$fsMatches.innerHTML = tournamentList;
}
// Sliding Menu
function $6db99e557c497bf6$var$slideMenu() {
    $6db99e557c497bf6$var$fsMenu.addEventListener("click", function(e) {
        e.preventDefault();
        document.body.classList.toggle("is-active");
    });
}
// Update Scores
function $6db99e557c497bf6$var$updateScore(dataId, scoreTeam, scoreTeamValue) {
    const res = $6db99e557c497bf6$var$matchList.findIndex((match)=>match.matchId == dataId.dataset.match);
    const name = scoreTeam.name;
    const item = {
        [name]: parseInt(scoreTeamValue)
    };
    Object.assign($6db99e557c497bf6$var$matchList[res], item);
    const keyfifasignifly = $6db99e557c497bf6$var$fifasignifly["matches"];
    Object.assign(keyfifasignifly, $6db99e557c497bf6$var$matchList);
    localStorage.setItem("fsjson", JSON.stringify($6db99e557c497bf6$var$fifasignifly));
    $6db99e557c497bf6$var$calculateLeaderboard();
}
// Fetch Input Info
function $6db99e557c497bf6$var$handleInput(e) {
    const input = e.target;
    const inputValue = e.target.value == "" ? 0 : e.target.value;
    const parentId = e.target.closest(".fs-match");
    $6db99e557c497bf6$var$updateScore(parentId, input, inputValue);
}
// Calculate Leaderboard
function $6db99e557c497bf6$var$calculateLeaderboard() {
    const leaderboard = [];
    $6db99e557c497bf6$var$fifasignifly.matches.forEach((match, index)=>{
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
    // Win = 3 Points, Tie = 1 Point, Loss = 0 Points
    leaderboard.forEach((leader)=>{
        leader.points = leader.wins * 3 + leader.ties;
    });
    // Sort First to Last Team
    const sortedLeaderboard = leaderboard.sort((teamA, teamB)=>teamA.points < teamB.points ? 1 : teamA.points > teamB.points ? -1 : 0);
    // Add Team Logo for each Team
    sortedLeaderboard.forEach((team, index)=>{
        const res = $6db99e557c497bf6$var$fifasignifly.teams.findIndex((equipe)=>equipe.name == team.id);
        const image = $6db99e557c497bf6$var$fifasignifly.teams[res].image;
        const item = {
            logo: image
        };
        Object.assign(sortedLeaderboard[index], item);
    });
    // Config nbrTeams: Limit number of Teams Shown
    const splicedSortedLeaderboard = sortedLeaderboard.slice(0, $6db99e557c497bf6$var$nbrTeams);
    $6db99e557c497bf6$var$displayLeaderboard(splicedSortedLeaderboard);
}
// Display Leaderboard
function $6db99e557c497bf6$var$displayLeaderboard(sortedLeaderboard) {
    const scoreboardList = sortedLeaderboard.map((team, index)=>`<div class="table-row">
        <div class="fixed-col">${index + 1}</div>
        <div class="table-flex"><div class="table-logo"><img src="${team.logo.src}" alt="${team.logo.alt}"></div> ${team.id}</div>
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
    $6db99e557c497bf6$var$fsScoreboard.innerHTML = scoreboardHeader;
}
$6db99e557c497bf6$var$displayMatches();
$6db99e557c497bf6$var$calculateLeaderboard();
$6db99e557c497bf6$var$slideMenu();
// Lock Inputs
$6db99e557c497bf6$var$btnAdmin.addEventListener("click", function(e) {
    e.preventDefault();
    const scoreInputs = document.querySelectorAll(".fs-matches input");
    scoreInputs.forEach((scoreInput)=>{
        scoreInput.disabled = !scoreInput.disabled;
        if (!scoreInput.disabled) $6db99e557c497bf6$var$btnAdmin.innerHTML = '<span class="material-symbols-outlined">lock_open</span> Admin';
        else $6db99e557c497bf6$var$btnAdmin.innerHTML = '<span class="material-symbols-outlined">lock</span> Admin';
    });
});
$6db99e557c497bf6$var$fsMatches.addEventListener("input", $6db99e557c497bf6$var$handleInput);


