
var PlacementLogic = function(board, players, changeLogicCallback) {

    if(!board || !players || !changeLogicCallback) { throw("Missing argument(s)!");  }

    var selectedUnit = null;
    var curPlayer = 0;

    this.toString = function() { return "placement"; }

    this.placeAutomatically = function() {
        placePlayerUnits(0);
        placePlayerUnits(1);
        startBattle();
    };

    function placePlayerUnits(playerIndex) {
        if(typeof playerIndex == 'undefined') { throw("Missing argument!"); }

        var playerRect = board.getPlayerRect(playerIndex);

        var emptyPositions = board.getEmptyPositions(playerRect);

        var player = players[playerIndex];
        for(var i = 0; i < player.units.length; i++) {
            var unit = player.units[i];
            if(unit.isPlaced()) { continue; }
            var posToPlace = emptyPositions[i];
            unit.place(board, posToPlace);
        }
    };

    this.onEnter = function() {
        board.highlightPlayerRegion(curPlayer);
    };

    this.onExit = function() {

    };

    this.getCurPlayer = function() {
        return players[curPlayer];
    };

    this.selectUnit = function(unit) {
        if(!unit.isPlaced()) {
            selectedUnit = unit;
            return true;
        }

        return false;
    };

    this.deselectUnit = function() {
        selectedUnit = null;
    };

    this.placeUnit = function(pos) {
        var playerRegion = board.getPlayerRect(curPlayer);

        if(playerRegion.contains(pos) && !board.getPiece(pos)) {
            selectedUnit.place(board, pos);
            endTurn();
            return true;
        }
        
        deselectUnit();
        return false;
    };

    function endTurn() {
        curPlayer = (curPlayer == 1) ? 0 : 1;
        
        var unplacedUnits = 0;
        players[curPlayer].units.forEach(unit => {
            unplacedUnits += unit.isPlaced() ? 0 : 1;
        });

        if(unplacedUnits == 0) {
            startBattle();
        }
        else {
            board.highlightPlayerRegion(curPlayer);
        }
    };

    function startBattle() {
        board.clearHighlight();
        changeLogicCallback("battle");
    };
};

