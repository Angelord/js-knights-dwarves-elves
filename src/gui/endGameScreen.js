

var endGameScreen = {};


endGameScreen.playerPositions = [
    new Point(100, 260),
    new Point(100, 400)
];

endGameScreen.scoreOffset = new Point(200, 0);
endGameScreen.killsOffset = new Point(0, 50);
endGameScreen.killsSpacing = new Point(60, 0);

endGameScreen.enable = function(game) {
    this.enabled = true;
    this.game = game;
};

endGameScreen.draw = function(drawer) {

    if(!this.enabled) { return; }

    var rounds = this.game.getRounds();
    var players = this.game.getPlayers();

    drawer.clear();

    drawer.drawText("GAME OVER", "32px Arial", new Point(400, 100) , "black");
    drawer.drawText("TOTAL ROUNDS : " + rounds, "25px Arial", new Point(400, 150), "darkgrey");

    players.forEach(function(player) {
        drawPlayer(player);
        drawPlayerKills(player);
    });

    function drawPlayer(player) {

        var index = player.getIndex();
        var nameText = "Player " + (index + 1);
        var scoreText = "Score " + player.getScore()
        var font = "25px Arial";
        var namePos = endGameScreen.playerPositions[index];
        var scorePos = namePos.add(endGameScreen.scoreOffset);

        drawer.drawText(nameText, font, namePos, player.getColor());
        drawer.drawText(scoreText, font, scorePos, player.getColor());
    };

    function drawPlayerKills(player) {

        var index = player.getIndex();
        var kills = player.getKills();
        var initialPos = endGameScreen.playerPositions[index].add(endGameScreen.killsOffset);

        var curPos = initialPos;
        kills.forEach( kill => {

            kill.setWorldPos(curPos);
            kill.draw(drawer);

            curPos = curPos.add(endGameScreen.killsSpacing);
        });

    };
};