
var MIN_OBSTACLES = 1;
var MAX_OBSTACLES = 5;

var BattleLogic = function(board, players) {

    var curPlayer = 0;
    var selectedUnit = null;
    var selectedUnitMovements = null;

    this.toString = function() { return "battle"; }

    this.onEnter = function() { 
        console.log("Entering battle");
        placeObstacles();
    }

    this.onExit = function() { }
    this.getCurPlayer = function() { return players[curPlayer]; }

    this.selectUnit = function(unit) { 
        if(players[curPlayer].owns(unit)) {

            selectedUnit = unit;
            selectedUnitMovements = pathfinding.getMovePositions(board, unit);
            board.highlightPositions(selectedUnitMovements, "#11115588");
            return true;
        }

        return false; 
    };

    this.deselectUnit = function() {
        selectedUnit = null;
        selectedUnitMovements = null;
        board.clearHighlight();
    };

    this.placeUnit = function(boardPos) { 
        this.deselectUnit();
        return false; 
    }; 

    function placeObstacles() {

        var battleRect = board.getBattlefieldRect();

        var emptyTiles = board.getEmptyPositions(battleRect);
        
        var numObstacles = getRandomInt(MIN_OBSTACLES, MAX_OBSTACLES);
        console.log("Placing " + numObstacles + " obstacles.");

        for(var i = 0; i < numObstacles; i++) {
            var position = emptyTiles[getRandomInt(0, emptyTiles.length - 1)];
            board.setPiece(position, "obstacle");
            emptyTiles.pop(position);
        };
    };
};