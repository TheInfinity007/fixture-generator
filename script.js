const players = new Set();

const playerMessage = document.getElementById('players-message');
const playerInput = document.getElementById('player-input');

function displayPlayersList() {
    const playerList = document.getElementById('players-list');

    while (playerList.firstChild) {
        playerList.removeChild(playerList.firstChild);
    }

    for(const playerName of players){
        const playerElement = document.createElement('li');
        playerElement.className = 'list-group-item text-capitalize';
        playerElement.textContent = playerName;
        playerList.appendChild(playerElement);
    }
}

function addPlayer() {
    
    const playerName = playerInput.value.trim();

    if (!playerName) {
        playerMessage.textContent = 'Please enter a player name';
        return;
    }
    
    if (players.has(playerName.toLowerCase())) {
        playerMessage.textContent = 'Player already added';
        return;
    }

    // Add the player name to the array
    
    players.add(playerName.toLowerCase());
    console.log('Playeer added!', playerName);
    console.log('players', players)
    playerInput.value = '';
    
    displayPlayersList();
    
}

function generateFixtures(players, startTime, endTime) {
    // Calculate available time slots based on start and end times
    const timeSlots = calculateTimeSlots(startTime, endTime);

    // Generate pairs and assign to time slots
    const fixtures = [];
    while (players.length > 0) {
        const player1 = players.shift();
        const player2 = players.pop();
        const timeSlot = timeSlots.shift();
        fixtures.push({
            homeTeam: player1,
            awayTeam: player2,
            time: timeSlot,
        });
    }

    // Display the generated fixtures
    displayFixtures(fixtures);
}


// Event Listeners

playerInput.addEventListener("keyup", function(event) {
  console.log("Input value:", event.target.value);
  playerMessage.innerText = "";
});
