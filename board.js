
var BOARD_WIDTH = 9;
var BOARD_HEIGHT = 7;
var TILE_WIDTH = 40;
var TILE_HEIGHT = 40;

var OFFSET = new Point(60, 60);
var TILE_SIZE = new Point(50, 50);
var TILE_SPACING = new Point(5, 5);

var Board = function() {

    var tiles = [];
    var pieces = [];

    this.create = function() {

        for(var x = 0; x < BOARD_WIDTH; x++) {
            tiles.push([]);
            for(var y = 0; y < BOARD_HEIGHT; y++) {
                tiles[0].push(0);
            }
        }
    };

    this.getPiece = function(x, y) {
        return tiles[x][y];
    };

    this.setPiece = function(x, y, piece) {
        tiles[x][y] = piece;

        if(!pieces.includes(piece)) {
            pieces.push(piece);
        }
    };

    this.removePiece = function(x, y) {
        tiles[x][y] = 0;
    };

    this.update = function() { 
    };

    this.draw = function(drawer) { 
        for(var x = 0; x < BOARD_WIDTH; x++) {
            for(var y = 0; y < BOARD_HEIGHT; y++) {
                var rect = new Rect(OFFSET.x + (TILE_SIZE.x + TILE_SPACING.x) * x,
                                    OFFSET.y + (TILE_SIZE.y + TILE_SPACING.y) * y, 
                                    TILE_SIZE.x, 
                                    TILE_SIZE.y );

                                    // console.log();
                drawer.drawRect( rect );
                //Draw tile
            }
        }
    };
};