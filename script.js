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
        time: timeSlot
      });
    }

    // Display the generated fixtures
    displayFixtures(fixtures);
}