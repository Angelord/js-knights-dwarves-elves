
var pathfinding = { };

pathfinding.getMovePositions = function(board, unit) {

    var movePositions = [];

    var movement = unit.getMovement();

    var openList = [ unit.getBoardPos() ];

    for(var i = 0; i <= movement; i++) {
        for(var j = openList.length - 1; j >= 0; j--) {

            var openListPos = openList[j];

            var neighbours = openListPos.getNeighbours();

            neighbours.forEach(neighbour => {

                if(board.contains(neighbour)
                && !movePositions.includes(neighbour) 
                && !openList.includes(neighbour) 
                && unit.canTraverse(neighbour)) {
                    openList.push(neighbour);
                }
            });

            openList.splice(j, 1);
            movePositions.push(openListPos);
        }
    };

    return movePositions;
};

