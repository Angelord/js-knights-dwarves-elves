
var BOARD_SIZE = new Point(9, 7);
var OFFSET = new Point(90, 90);
var TILE_SIZE = new Point(50, 50);
var TILE_SPACING = new Point(5, 5);

var REGION_PLAYER_1 = new Rect(0, 0, BOARD_SIZE.x, 2);
var REGION_PLAYER_2 = new Rect(0, 5, BOARD_SIZE.x, 2);
var REGION_BATTLEFIElD = new Rect(0, 2, BOARD_SIZE.x, 3);

var COLOR_HIGHLIGHT = "#555555"; 
var COLOR_DARKENED = "#771111";

var Board = function() {

    var tiles = [];
    var pieces = [];
    var highlightRegion = null;

    for(var x = 0; x < BOARD_SIZE.x; x++) {
        tiles.push([]);
        for(var y = 0; y < BOARD_SIZE.y; y++) {
            tiles[0].push(null);
        }
    }

    //Transforms mouse coordinates to board coordinates
    this.worldToBoardPos = function(pos) {
        if(!pos) { throw("Missing argument!"); }

        var transformed = new Point(pos.x, pos.y);
        transformed = transformed.sub(OFFSET);
        transformed.x /= (TILE_SIZE.x + TILE_SPACING.x);
        transformed.y /= (TILE_SIZE.y + TILE_SPACING.y);
        transformed = transformed.round();

        return transformed;
    };

    this.boardToWorldPos = function(pos) {
        if(!pos) { throw("Missing argument!"); }

        var transformed = new Point(pos.x, pos.y);
        transformed.x *= (TILE_SIZE.x + TILE_SPACING.x);
        transformed.y *= (TILE_SIZE.y + TILE_SPACING.y);
        transformed = transformed.add(OFFSET);
        
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
        highlightRegion = (playerIndex == 0) ? REGION_PLAYER_1 : REGION_PLAYER_2;
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

        for(var x = 0; x < BOARD_SIZE.x; x++) {
            for(var y = 0; y < BOARD_SIZE.y; y++) {
                var pos = new Point(x, y);

                var color = COLOR_HIGHLIGHT;
                if(highlightRegion && !highlightRegion.contains(pos)) {
                    color = COLOR_DARKENED;
                }

                var rect = new Rect(OFFSET.x + (TILE_SIZE.x + TILE_SPACING.x) * x - TILE_SIZE.x / 2,
                                    OFFSET.y + (TILE_SIZE.y + TILE_SPACING.y) * y - TILE_SIZE.y / 2, 
                                    TILE_SIZE.x, 
                                    TILE_SIZE.y );

                drawer.drawRect(rect, color);
            }
        }
    };
};