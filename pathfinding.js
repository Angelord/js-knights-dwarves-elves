
var pathfinding = { };

pathfinding.getArea = function(board, startingPos, range, canTraverseCall, addToResCall) {

    if(!board || !startingPos || !range || !canTraverseCall || !addToResCall) {
        throw ("Missing argument(s)!");
    }

    var area = [];

    var openList = [ startingPos ];

    for(var i = 0; i <= range; i++) {
        for(var j = openList.length - 1; j >= 0; j--) {

            var openListPos = openList[j];
            
            openList.splice(j, 1);
            area.push(openListPos);
            
            if(!canTraverseCall(openListPos) && openListPos != startingPos) {
                continue;
            }

            var neighbours = openListPos.getNeighbours();

            neighbours.forEach(neighbour => {

                if(board.contains(neighbour)
                && !area.includes(neighbour) 
                && !openList.includes(neighbour) 
                && (canTraverseCall(neighbour) || addToResCall(neighbour))) {

                    openList.push(neighbour);
                }
            });


        }
    };

    for(var i = area.length - 1; i >= 0; i--) {
        if(!addToResCall(area[i])) {
            area.splice(i, 1);
        }
    }

    return area;
}