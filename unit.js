
var UNIT_SIZE = new Point(40, 40);

var createKnight = function(owner) {
    var knight = new Unit(owner, 8, 3, 15, 1, 1);
    knight.toString = function() { return "knight"; }
    return knight;
}

var createElf = function(owner) {
    var elf = new Unit(owner, 5, 1, 10, 3, 3);
    elf.toString = function() { return "elf"; }
    return elf;
}

var createDwarf = function(owner) {
    var dwarf = new Unit(owner, 6, 2, 12, 2, 2);
    dwarf.toString = function() { return "dwarf"; }
    return dwarf;
}

var Unit = function(owner, damage, armor, health, attRange, movement) {

    this.damage = damage;
    this.armor = armor;
    this.health = health;
    this.attRange = attRange;
    this.movement = movement;

    var curHealth = health;
    var placed = false;
    var boardPos = null;
    var worldPos = new Point(0, 0);

    this.getWorldPos = function() { return worldPos; }
    this.setWorldPos = function(value) { if(value) { worldPos = value; } }

    this.getHealth = function() { return curHealth; }
    this.getMaxHealth = function() { return this.health; }  

    this.isDead = function() { return curHealth <= 0; }

    this.raycast = function(pos) {
        if(!pos) { throw("Missing argument!"); }

        var boundingRect = getBoundingRect();

        return boundingRect.contains(pos);
    }

    this.place = function(board, pos) {
        if(!board || !pos) { return; }
    
        if(placed) 
            throw ("Attempting to place a game piece for a second time!");
    
        this.board = board;
        boardPos = pos;
        board.setPiece(pos, this);
        placed = true;
    };

    this.attack = function(otherUnit) {
        otherUnit.takeDamage(this.damage);
    };

    this.takeDamage = function(amount) {
        curHealth -= amount;
        if(curHealth <= 0) {
            // die();
        }
    };

    this.update = function() {
        if(isPlaced()) {
            worldPos = getBoard().boardToWorldPos(getPos())
        }
    };

    this.draw = function(drawer) {
        if(!drawer) { return; }

        var rectToDraw = getBoundingRect();
        drawer.drawRect(rectToDraw, "#888888");
    };

    function getBoundingRect() {
        return new Rect( 
            worldPos.x - UNIT_SIZE.x / 2,
            worldPos.y - UNIT_SIZE.y / 2,
            UNIT_SIZE.x,
            UNIT_SIZE.y
        );
    };
}