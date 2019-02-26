
var BOARD_RECT = new Rect(0, 0, 9, 7);
var OFFSET = new Point(90, 90);
var TILE_SIZE = new Point(52, 52);
var TILE_SPACING = new Point(2, 2);
var BORDER = 4;

var REGION_PLAYER_1 = new Rect(0, 0, BOARD_RECT.w, 2);
var REGION_PLAYER_2 = new Rect(0, 5, BOARD_RECT.w, 2);
var REGION_BATTLEFIELD = new Rect(0, 2, BOARD_RECT.w, 3);

var COLOR_BATTLEFIELD = "#555555";
var COLOR_PLAYERS_LIGHT = "#666666";
var COLOR_PLAYERS_DARK = "#888888"; 
var COLOR_DARKENED = "#77111177";
var COLOR_BACKGROUND = "black";
var COLOR_OBSTACLE = "black";

var Board = function() {

    var tiles = [];
    var pieces = [];
    var highlightRegion = null;
    var highlightPositions = [];

    for(var x = 0; x < BOARD_RECT.w; x++) {
        tiles.push([]);
        highlightPositions.push([]);
        for(var y = 0; y < BOARD_RECT.h; y++) {
            tiles[x].push(null);
            highlightPositions[x].push(null);
        }
    }

    this.contains = function(pos) {
        return BOARD_RECT.contains(pos);
    };

    this.getSize = function() {
        return BOARD_RECT.getSize();
    };

    this.getBattlefieldRect = function() {
        return REGION_BATTLEFIELD;
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
        if(!BOARD_RECT.contains(pos)) { return null; }

        return tiles[pos.x][pos.y];
    };

    this.setPiece = function(pos, piece) {
        if(!pos) { throw("Missing argument!"); }

        tiles[pos.x][pos.y] = piece;

        if(!pieces.includes(piece)) {
            pieces.push(piece);
        }
    };

    this.removePiece = function(pos) {
        var piece = tiles[pos.x][pos.y];
        tiles[pos.x][pos.y] = null;
        if(piece) { 
            CollectionUtil.removeSpecific(pieces, piece);
        }
    };

    this.getEmptyPositions = function(rect) {
        //Check entire board if no rect specified
        var rectRef = rect ? rect : BOARD_RECT;

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

    this.highlightPositions = function(positions, color) {
        positions.forEach(pos => {
            highlightPositions[pos.x][pos.y] = color;
        });
    };

    this.highlightPlayerRegion = function(playerIndex) {
        var yOffset = playerIndex == 0 ? REGION_BATTLEFIELD.y : 0;
        highlightRegion = new Rect(0, yOffset, BOARD_RECT.w, BOARD_RECT.h - REGION_PLAYER_1.h);
    };

    this.clearHighlight = function() {
        highlightRegion = null;
        for(var x = 0; x < BOARD_RECT.w; x++) {
            for(var y = 0; y < BOARD_RECT.h; y++) {
                highlightPositions[x][y] = null;
            }
        }
    };
    
    this.update = function() { 
    };

    this.draw = function(drawer) { 
        drawBackground(drawer);
        drawTiles(drawer);
        drawRegionHighlight(drawer);
        drawPositionHighlights(drawer);
    };

    function drawBackground(drawer) {
        var sz = BOARD_RECT.getSize();
        var width = sz.x * TILE_SIZE.x + (sz.x - 1) * TILE_SPACING.x + BORDER;
        var height = sz.y * TILE_SIZE.y + (sz.y - 1) * TILE_SPACING.y + BORDER;
        var bckgrRect = new Rect(OFFSET.x - TILE_SIZE.x / 2 - BORDER / 2, 
                                OFFSET.y - TILE_SIZE.y / 2 - BORDER / 2, 
                                width, 
                                height);
        drawer.drawRect(bckgrRect, COLOR_BACKGROUND);
    };

    function drawTiles(drawer) {
        for(var x = 0; x < BOARD_RECT.w; x++) {
            for(var y = 0; y < BOARD_RECT.h; y++) {
                drawTile(drawer, new Point(x, y));
            }
        }
    };

    function drawRegionHighlight(drawer) {
        if(!highlightRegion) { return; }

        for(var x = highlightRegion.x; x < highlightRegion.getEdgeX(); x++) {
            for(var y = highlightRegion.y; y < highlightRegion.getEdgeY(); y++) {
                drawTile(drawer, new Point(x, y), COLOR_DARKENED);
            }
        }
    }

    function drawPositionHighlights(drawer) {
        for(var x = 0; x < BOARD_RECT.w; x++) {
            for(var y = 0; y < BOARD_RECT.h; y++) {
                var highlight = highlightPositions[x][y];
                if(highlight != null) {
                    drawTile(drawer, new Point(x, y), highlight);
                }
            }
        }
    }

    function drawTile(drawer, pos, color) {
        if(!pos) { throw("Missing argument!"); }
        if(!BOARD_RECT.contains(pos)) { throw("Position outside of board range " + pos); }

        var colorRef = color ? color : determineTileColor(pos);

        var rect = new Rect(OFFSET.x + (TILE_SIZE.x + TILE_SPACING.x) * pos.x - TILE_SIZE.x / 2,
                            OFFSET.y + (TILE_SIZE.y + TILE_SPACING.y) * pos.y - TILE_SIZE.y / 2, 
                            TILE_SIZE.x, 
                            TILE_SIZE.y );

        drawer.drawRect(rect, colorRef);
    };

    function determineTileColor(pos) {
        if(typeof pos == 'undefined') { throw("Missing argument!"); }

        var color = null;

        if(tiles[pos.x][pos.y] == "obstacle") {
            color = COLOR_OBSTACLE;
        }
        else if(REGION_BATTLEFIELD.contains(pos)) {
            color = COLOR_BATTLEFIELD;
        }
        else {
            color = (pos.x + pos.y * BOARD_RECT.w) % 2 == 0 ? COLOR_PLAYERS_LIGHT : COLOR_PLAYERS_DARK;
        }

        return color;
    };
};