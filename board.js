
var BOARD_SIZE = new Point(9, 7);
var OFFSET = new Point(90, 90);
var TILE_SIZE = new Point(52, 52);
var TILE_SPACING = new Point(2, 2);
var BORDER = 4;

var REGION_PLAYER_1 = new Rect(0, 0, BOARD_SIZE.x, 2);
var REGION_PLAYER_2 = new Rect(0, 5, BOARD_SIZE.x, 2);
var REGION_BATTLEFIElD = new Rect(0, 2, BOARD_SIZE.x, 3);

var COLOR_BATTLEFIELD = "#555555";
var COLOR_PLAYERS_LIGHT = "#666666";
var COLOR_PLAYERS_DARK = "#888888"; 
var COLOR_DARKENED = "#771111";
var COLOR_BACKGROUND = "black";
var COLOR_OBSTACLE = "black";

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

    this.getSize = function() {
        return BOARD_SIZE;
    };

    this.getBattlefieldRect = function() {
        return REGION_BATTLEFIElD;
    };

    this.getPlayerRect = function(playerIndex) {
        return playerIndex == 1 ? REGION_PLAYER_2 : REGION_PLAYER_1; 
    };

    //Transforms world coordinates to board coordinates
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

    this.getEmptyPositions = function(rect) {
        //Check entire board if no rect specified
        var rectRef = rect ? rect : new Rect(0, 0, BOARD_SIZE.x, BOARD_SIZE.y);

        var emptyPositions = [];
        for(var x = rectRef.x; x < (rectRef.x + rectRef.w); x++) {
            for(var y = rectRef.y; y < (rectRef.y + rectRef.h); y++) {
                var pos = new Point(x, y);
                if(!this.getPiece(pos)) {
                    emptyPositions.push(pos);
                }
            }
        }

        return emptyPositions;
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
        drawBackground(drawer);
        drawTiles(drawer);
    };

    function drawBackground(drawer) {
        var sz = BOARD_SIZE;
        var width = sz.x * TILE_SIZE.x + (sz.x - 1) * TILE_SPACING.x + BORDER;
        var height = sz.y * TILE_SIZE.y + (sz.y - 1) * TILE_SPACING.y + BORDER;
        var bckgrRect = new Rect(OFFSET.x - TILE_SIZE.x / 2 - BORDER / 2, 
                                OFFSET.y - TILE_SIZE.y / 2 - BORDER / 2, 
                                width, 
                                height);
        drawer.drawRect(bckgrRect, COLOR_BACKGROUND);
    };

    function drawTiles(drawer) {
        for(var x = 0; x < BOARD_SIZE.x; x++) {
            for(var y = 0; y < BOARD_SIZE.y; y++) {
                drawTile(drawer, new Point(x, y));
            }
        }
    };

    function drawTile(drawer, pos) {
        if(!pos) { throw("Missing argument!"); }

        var color = null;

        if(highlightRegion && !highlightRegion.contains(pos)) {
            color = COLOR_DARKENED;
        }
        else if(tiles[pos.x][pos.y] == "obstacle") {
            color = COLOR_OBSTACLE;
        }
        else if(REGION_BATTLEFIElD.contains(pos)) {
            color = COLOR_BATTLEFIELD;
        }
        else {
            color = (pos.x + pos.y * BOARD_SIZE.x) % 2 == 0 ? COLOR_PLAYERS_LIGHT : COLOR_PLAYERS_DARK;
        }

        var rect = new Rect(OFFSET.x + (TILE_SIZE.x + TILE_SPACING.x) * pos.x - TILE_SIZE.x / 2,
                            OFFSET.y + (TILE_SIZE.y + TILE_SPACING.y) * pos.y - TILE_SIZE.y / 2, 
                            TILE_SIZE.x, 
                            TILE_SIZE.y );

        drawer.drawRect(rect, color);
    };
};