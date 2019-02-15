
var GamePiece = function() {
    
    var boardVal;
    var boardPosition;
    var placed = false;

    this.isPlaced = function() { return placed; }
    this.getBoard = function() { return board; }
    this.getX = function() { return position.x; }
    this.getY = function() { return position.y; }
    this.getPos = function() { return position; }

    this.place = function(board, pos) {

        if(placed) 
            throw ("Attempting to place a game piece for a second time!");
    
        boardVal = board;
        boardPosition = pos;
        placed = true;
    }
    
    this.update = function() { }
    this.draw = function() { }
};