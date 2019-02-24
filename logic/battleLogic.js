

var MIN_OBSTACLES = 1;
var MAX_OBSTACLES = 5;

var BattleLogic = function(board, players) {

    console.log("Entering battle");

    var boardRef = board;
    var playersRef = players;

    placeObstacles();

    function placeObstacles() {

        var battleRect = board.getBattlefieldRect();

        var emptyTiles = board.getEmptyPositions(battleRect);
        
        var numObstacles = getRandomInt(MIN_OBSTACLES, MAX_OBSTACLES);
        console.log("Placing " + numObstacles + " obstacles.");

        for(var i = 0; i < numObstacles; i++) {
            var position = emptyTiles[getRandomInt(0, emptyTiles.length - 1)];
            boardRef.setPiece(position, "obstacle");
            emptyTiles.pop(position);
        };
    };
};