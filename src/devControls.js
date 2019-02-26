
//Some functions for quick testing. Would be removed before release


function placeAutomatically() {
    var logic = game.getLogic();
    if(logic.placeAutomatically) {
        logic.placeAutomatically();
    }
}

function killOpponent() {
    if(game.getLogic().toString() != "battle") { return; }

    var players = game.getPlayers();
    var curPlayer = game.getLogic().getCurPlayer();
    var playerToKill = curPlayer.getIndex() == 0 ? players[1] : players[0];
    var units = playerToKill.units;

    for(var i = units.length - 1; i >= 0; i--) {
        units[i].die();
    }

    game.end();
}