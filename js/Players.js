class Players {
    constructor() {
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(player) {
        this.players = this.players.filter(p => p !== player);
    }

    getPlayers() {
        return this.players;
    }
}