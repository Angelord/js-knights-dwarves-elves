
var BOARD_WIDTH = 9;
var BOARD_HEIGHT = 7;

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
            tiles[0].push(null);
        }
    }

    //Transforms mouse coordinates to board coordinates
    this.mouseToBoardPos = function(pos){
        if(!pos) { throw("Missing argument!"); }

        var transformed = new Point(pos.x, pos.y);
        transformed.x -= OFFSET.x;
        transformed.y -= OFFSET.y;
        transformed.x /= (TILE_SIZE.x + TILE_SPACING.x);
        transformed.y /= (TILE_SIZE.y + TILE_SPACING.y);
        transformed.x = Math.round(transformed.x);
        transformed.y = Math.round(transformed.y);

        console.log(transformed);

        return transformed;
    };

    this.getPiece = function(pos) {
        if(!pos) { throw("Missing argument!"); }

        return tiles[pos.x][pos.y];
    };

    this.setPiece = function(pos, piece) {
        if(!pos) { throw("Missing argument!"); }

        tiles[pos.x][pos.y] = piece;

        if(!pieces.includes(piece)) {
            pieces.push(piece);
        }
    };

    this.removePiece = function(x, y) {
        var piece = tiles[x][y];
        tiles[x][y] = null;
        if(piece) { 
            pieces.pop(piece); 
        }
    };

    this.highlightPlayerRegion = function(playerIndex) {
        highlightRegion = (playerIndex == 0) ? PLAYER_1_REGION : PLAYER_2_REGION;
    };

    this.clearHighlight = function() {
        highlightRegion = null;
    };

    this.highlightContains = function(pos) {
        return highlightRegion.contains(pos);
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