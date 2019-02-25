
var UNIT_SIZE = new Point(40, 40);

var createKnight = function(owner) {
    var knight = new Unit(owner, 8, 3, 15, 1, 1);
    knight.toString = function() { return "knight"; }
    knight.color = "#5555AA";

    return knight;
}

var createElf = function(owner) {
    var elf = new Unit(owner, 5, 1, 10, 3, 3);
    elf.toString = function() { return "elf"; }
    elf.color = "#55AA55";

    return elf;
}

var createDwarf = function(owner) {
    var dwarf = new Unit(owner, 6, 2, 12, 2, 2);
    dwarf.toString = function() { return "dwarf"; }
    dwarf.color = "#AAAA55";

    return dwarf;
}

var Unit = function(owner, damage, armor, health, attRange, movement) {

    this.color = "#888888";

    var curHealth = health;
    var placed = false;
    var worldPos = new Point(0, 0);
    var boardPos = null;
    var boardRef = null;

    this.getOwner = function() { return owner; }
    this.getWorldPos = function() { return worldPos; }
    this.setWorldPos = function(value) { if(value) { worldPos = value; } }
    this.getBoardPos = function() { return boardPos; }
    this.getDamage = function() { return damage; }
    this.getArmor = function() { return armor; }
    this.getMovement = function() { return movement; } 
    this.getAttRange = function() { return attRange; }
    this.getHealth = function() { return curHealth; }
    this.getMaxHealth = function() { return this.health; }  

    this.isDead = function() { return curHealth <= 0; }
    this.isPlaced = function() { return placed; }

    this.raycast = function(pos) {
        if(!pos) { throw("Missing argument!"); }

        var boundingRect = getBoundingRect();
        return boundingRect.contains(pos);
    }

    this.canTraverse = function(pos) {
        return (!boardRef.getPiece(pos));
    };

    this.place = function(board, pos) {
        if(!board || !pos) { return; }
    
        if(placed) 
            throw ("Attempting to place a game piece for a second time!");
    
        boardRef = board;

        boardPos = pos;
        worldPos = boardRef.boardToWorldPos(boardPos);
        boardRef.setPiece(pos, this);
        placed = true;
    };

    this.remove = function() {
        if(!placed)
            throw("Attempting to remove a game piece that has not been placed on the board!");
        boardRef.removePiece(boardPos);
        boardRef = null;
        boardPos = null;
        placed = false;
    };

    this.attack = function(otherUnit) {
        otherUnit.takeDamage(this.damage);
    };

    this.takeDamage = function(amount) {
        var finalAmount = amount - armor;
        if(finalAmount <= 0) { return; }

        curHealth -= finalAmount;
        if(curHealth <= 0) {
            console.log("Dead");
            // die();
        }
    };

    this.update = function() {
        // if(isPlaced()) {
            // worldPos = getBoard().boardToWorldPos(getPos())
        // }
    };

    this.draw = function(drawer) {
        if(!drawer) { return; }

        var rectToDraw = getBoundingRect();
        drawer.drawRect(rectToDraw, this.color);
        drawer.drawText(curHealth, "30px Arial", worldPos, "black");
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