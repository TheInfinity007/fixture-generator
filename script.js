let players;
const teams = [
    {
        player1: "A",
        player2: "B",
        name: "Raju"
    },
    {
        player1: "C",
        player2: "D",
        name: "Ankush"
    },
    {
        player1: "E",
        player2: "F",
        name: "Aadi"
    },
    {
        player1: "G",
        player2: "H",
        name: "Rohan"
    },
    {
        player1: "I",
        player2: "J",
        name: "Raja"
    },
    {
        player1: "K",
        player2: "L",
        name: "Mohit"
    },
    {
        player1: "M",
        player2: "N",
        name: "Sachin"
    },
    {
        player1: "O",
        player2: "P",
        name: "Mandeep"
    }
];
let availablePlayersName = [];

class Team {
    constructor(player1, player2, name) {
        this.player1 = player1;
        this.player2 = player2;
        this.name = name || this.player1;
    }
}

function addDefaultPlayers() {
    // create 8 players first 4 shoub be captains
    const defaultPlayers = [
        // { name: 'player1', isCaptain: true },
        // { name: 'player2', isCaptain: true },
        // { name: 'player3', isCaptain: true },
        // { name: 'player4', isCaptain: true },
        // { name: 'player5', isCaptain: false },
        // { name: 'player6', isCaptain: false },
        // { name: 'player7', isCaptain: false },
        // { name: 'player8', isCaptain: false },
    ];

    for (const playerDetail of defaultPlayers) {
        const player = new Player(playerDetail.name, playerDetail.isCaptain);
        players.addPlayer(player);
    }
}
const captainsNames = ['player1', 'player2', 'player3', 'player4'];

const playerMessage = document.getElementById('players-message');
const playerInput = document.getElementById('player-input');

function displayPlayersList() {
    const playerListElement = document.getElementById('players-list');

    while (playerListElement.firstChild) {
        playerListElement.removeChild(playerListElement.firstChild);
    }

    const playersList = players.getPlayers();

    for (const player of playersList) {
        const playerElement = document.createElement('li');
        playerElement.className = 'list-group-item text-capitalize';
        playerElement.textContent = player.name;

        // create captain badge
        if (captainsNames.includes(player.name)) {
            const captainBadge = document.createElement('span');
            captainBadge.className = 'badge bg-primary rounded-pill ms-2';
            captainBadge.textContent = 'C';
            playerElement.appendChild(captainBadge);
        }
        playerListElement.appendChild(playerElement);
    }
}

function clearExistingChildElements(parentElement) {
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

function displayTeamList(){
    const teamListElement = document.getElementById('teams-list');

    // Clear existing elements
    clearExistingChildElements(teamListElement);

    for (const team of teams) {
        const teamElement = document.createElement('tr');
        teamElement.className = 'text-capitalize';

        const teamNameElement = document.createElement('td');
        teamNameElement.textContent = team.name;
        teamElement.appendChild(teamNameElement);

        const player1Element = document.createElement('td');
        player1Element.textContent = team.player1;
        teamElement.appendChild(player1Element);

        const player2Element = document.createElement('td');
        player2Element.textContent = team.player2;
        teamElement.appendChild(player2Element);
        
        teamListElement.appendChild(teamElement);
    }
}

function addPlayer() {
    const playerName = playerInput?.value?.toLowerCase().trim();

    if (!playerName) {
        playerMessage.textContent = 'Please enter a player name';
        return;
    }

const isPlayerExist = players.getPlayers().find(player => player.name === playerName);

    if (isPlayerExist) {
        playerMessage.textContent = 'Player already added';
        return;
    }

    const  player = new Player(playerName);

    players.addPlayer(player);
    console.log('Playeer added!', player.name);
    console.log('players', players);
    playerInput.value = '';

    displayPlayersList();
}

function generateRoundRobinFixture(teams) {
    const fixture = [];
    const numTeams = teams.length;

    // Each team plays every other team
    for (let round = 0; round < numTeams - 1; round++) {
        const roundMatches = [];
        
        for (let i = 0; i < numTeams / 2; i++) {
            const home = (round + i) % (numTeams - 1);
            let away = (numTeams - 1 - i + round) % (numTeams - 1);

            if (i === 0) {
                // Last team rotates to play against the first team in the next rounds
                away = numTeams - 1;
            }

            roundMatches.push([teams[home], teams[away]]);
        }

        fixture.push(roundMatches);
    }

    return fixture;
}

const getAvatarImageUrl = (name) => {
    const initials = name.split(' ').map(word => word[0]).splice(0, 2).join('');
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=ffffff&size=60`
}

function displayFixtures(schedule){
    schedule = schedule.splice(0, 3);
    const fixturesContainerElement = document.getElementById('fixtures-container');
    const fixturesHeaderElement = document.createElement('h2');
    fixturesHeaderElement.textContent = 'Fixtures';
    fixturesContainerElement.appendChild(fixturesHeaderElement);
   
    for(let round = 0; round < schedule.length; round++){
        const roundElement = document.createElement('div');
        roundElement.className = 'round';
        fixturesContainerElement.appendChild(roundElement);
        console.log(fixturesContainerElement);

        const roundHeaderElement = document.createElement('h3');
        roundHeaderElement.textContent = `Round ${round + 1}`;
        roundElement.appendChild(roundHeaderElement);

        console.log(`Round ${round + 1}:`);

        // create table container for matches
        // const tableElement = document.createElement('div');
        // tableElement.className = 'table d-flex justify-content-center flex-column';
        // roundElement.appendChild(tableElement);

        for(let match = 0; match < schedule[round].length; match++){
            const team1Name = schedule[round][match][0].name;
            const team2Name = schedule[round][match][1].name;

            const matchElement = document.createElement('div');
            matchElement.className = 'fixture d-flex justify-content-between align-items-center';
            roundElement.appendChild(matchElement);


            // column 1 team 1 img
            let imgElement = document.createElement('img');
            imgElement.src = getAvatarImageUrl(team1Name);
            matchElement.appendChild(imgElement);

            // column 2 of team 1 name
            let divElement = document.createElement('div');
            divElement.className = 'match-info';
            divElement.textContent = team1Name;
            matchElement.appendChild(divElement);

            // column 3 of versus
            divElement = document.createElement('div');
            divElement.className = 'versus bg-primary p-2 text-uppercase';
            divElement.textContent = 'vs';
            matchElement.appendChild(divElement);


            // column 4 of team 2 name
            divElement = document.createElement('div');
            divElement.className = 'match-info';
            divElement.textContent = team2Name;
            matchElement.appendChild(divElement);

            // column 5 team 2 img
            imgElement = document.createElement('img');
            imgElement.src = getAvatarImageUrl(team2Name);
            matchElement.appendChild(imgElement);

            console.log(`Match ${match + 1}: ${schedule[round][match][0].name} vs ${schedule[round][match][1].name}`);
        }

        
    }
}

function generateFixtures(){
    // const matchesPerTeam = 2;
    const schedule = generateRoundRobinFixture(teams);
    // console.log('Schedule:', schedule);
    displayFixtures(schedule);
}

function loadPlayerSelection() {
    // Load Player 1 selection
    const selectPlayer1Element = document.getElementById('select_player_1');
    // cleanExistingOptions(selectPlayer1Element);

    while (selectPlayer1Element.firstChild) {
        selectPlayer1Element.removeChild(selectPlayer1Element.firstChild);
    }

    for (const availablePlayer of availablePlayersName) {
        const option = document.createElement('option');
        option.value = availablePlayer;
        option.textContent = availablePlayer;
        selectPlayer1Element.appendChild(option);
    }

    // Load Player 2 selection
    const selectPlayer2Element = document.getElementById('select_player_2');
    // cleanExistingOptions(selectPlayer2Element);
    while (selectPlayer2Element.firstChild) {
        selectPlayer2Element.removeChild(selectPlayer2Element.firstChild);
    }

    for (const availablePlayer of availablePlayersName) {
        const option = document.createElement('option');
        option.value = availablePlayer;
        option.textContent = availablePlayer;
        selectPlayer2Element.appendChild(option);
    }
    console.log("Team loaded");
}

function addTeam () {
    const p1Name = document.getElementById('select_player_1').value;
    const p2Name = document.getElementById('select_player_2').value;
    // const teamName = document.getElementById('team-name').value;

    const addTeamMessageElement = document.getElementById('add-team-message');

    if (!p1Name || !p2Name) {
        addTeamMessageElement.textContent = 'Please select players';
        return;
    }

    if (p1Name === p2Name) {
        addTeamMessageElement.textContent = 'Players cannot be the same';
        return;
    }

    const teamName = p1Name;
    const team = new Team(p1Name, p2Name, teamName);
    teams.push(team);
    console.log('Team added!', team);
    console.log('Teams:', teams);

    // remove p1 and p2 from available players
    availablePlayersName = availablePlayersName.filter(playerName => playerName !== p1Name && playerName !== p2Name);

    displayTeamList();
    loadPlayerSelection();
}


// Event Listeners

playerInput.addEventListener('keyup', function (event) {
    console.log('Input value:', event.target.value);
    playerMessage.innerText = '';
});

function init() {
    players = new Players();
    addDefaultPlayers();
    console.log(players.getPlayers());
    displayPlayersList();
    availablePlayersName = players.getPlayers().map(player => player.name);
    loadPlayerSelection();
}

init();



