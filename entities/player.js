

var PLAYER_1_OFFSET = new Point(640, 100);
var PLAYER_2_OFFSET = new Point(640, 300);
var PLAYER_1_COLOR = "#5555AA";
var PLAYER_2_COLOR = "#55AA55";

var UNIT_OFFSET = new Point(60, 60);

var Player = function(index, game) {

    var indexRef = index ? index : 0;
    this.getIndex = function() { return indexRef; }

    var offset = index == 0 ? PLAYER_1_OFFSET : PLAYER_2_OFFSET;

    this.units = [
        createKnight(this), createKnight(this),
        createElf(this), createElf(this),
        createDwarf(this), createDwarf(this)
    ];

    this.units.forEach(unit => {
        game.addPiece(unit); 
    });

    for(var x = 0; x < 2; x++) {
        for(var y = 0; y < 3; y++) {
            var unit = this.units[y * 2 + x];

            var pos = new Point(offset.x + x * UNIT_OFFSET.x, offset.y + y * UNIT_OFFSET.y);
            unit.setWorldPos(pos);
        }
    }

    this.owns = function(unit) {
        if(typeof unit == 'undefined') { throw("Missing argument!"); }

        return (unit.getOwner() == this);
    }

    this.getColor = function() {
        return indexRef == 0 ? PLAYER_1_COLOR : PLAYER_2_COLOR;
    };
};