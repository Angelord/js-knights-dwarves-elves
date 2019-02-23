
var BOARD_WIDTH = 9;
var BOARD_HEIGHT = 7;
var TILE_WIDTH = 40;
var TILE_HEIGHT = 40;

var OFFSET = new Point(60, 60);
var TILE_SIZE = new Point(50, 50);
var TILE_SPACING = new Point(5, 5);

var PLAYER_1_REGION = new Rect(0, 0, BOARD_WIDTH, 2);
var PLAYER_2_REGION = new Rect(0, 5, BOARD_WIDTH, 2);

var COLOR_HIGHLIGHT = "#888888"; 
var COLOR_DARKENED = "#444444";

var Board = function() {

    var tiles = [];
    var pieces = [];
    var highlightRegion = null;

    for(var x = 0; x < BOARD_WIDTH; x++) {
        tiles.push([]);
        for(var y = 0; y < BOARD_HEIGHT; y++) {
            tiles[0].push(0);
        }
    }

    this.highlightPlayerRegion = function(playerIndex) {
        highlightRegion = (playerIndex == 0) ? PLAYER_1_REGION : PLAYER_2_REGION;
    };

    this.clearHighlight = function() {
        highlightRegion = null;
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
                var pos = new Point(x, y);

                var color = COLOR_HIGHLIGHT;
                if(highlightRegion && !highlightRegion.contains(pos)) {
                    color = COLOR_DARKENED;
                }

                var rect = new Rect(OFFSET.x + (TILE_SIZE.x + TILE_SPACING.x) * x,
                                    OFFSET.y + (TILE_SIZE.y + TILE_SPACING.y) * y, 
                                    TILE_SIZE.x, 
                                    TILE_SIZE.y );

                drawer.drawRect(rect, color);
            }
        }
    };
};