
var BOARD_WIDTH = 9;
var BOARD_HEIGHT = 7;
var TILE_WIDTH = 40;
var TILE_HEIGHT = 40;

var Board = function() {

    var pieces = [];

    this.create = function() {

        for(var x = 0; x < BOARD_WIDTH; x++) {
            pieces.push([]);
            for(var y = 0; y < BOARD_HEIGHT; y++) {
                pieces[0].push(0);
            }
        }
    };

    this.getPiece = function(x, y) {
        return pieces[x][y];
    };

    this.setPiece = function(x, y, piece) {
        pieces[x][y] = piece;
    };

    this.removePiece = function(x, y) {
        pieces[x][y] = 0;
    };

    this.update = function() { 
        
    };

    this.draw = function() { 
        for(var x = 0; x < BOARD_WIDTH; x++) {
            for(var y = 0; y < BOARD_HEIGHT; y++) {
                //Draw tile
            }
        }
    };
};