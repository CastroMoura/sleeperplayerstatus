import fetch from "node-fetch";

const leagueId = "1235567915391000576"; // coloque o ID da sua liga

async function getPlayersStatus() {
  // Pega os rosters da liga
  const rostersRes = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`);
  const rosters = await rostersRes.json();

  // Pega todos os jogadores da NFL
  const playersRes = await fetch("https://api.sleeper.app/v1/players/nfl");
  const players = await playersRes.json();

  // Exemplo: pega os jogadores do primeiro roster
  const firstRoster = rosters[0];
  const playerIds = firstRoster.players;

  const playerStatuses = playerIds.map(id => {
    const p = players[id];
    return {
      name: p.full_name,
      team: p.team,
      position: p.position,
      injury_status: p.injury_status || "Healthy"
    };
  });

  console.log(playerStatuses);
}

getPlayersStatus();
