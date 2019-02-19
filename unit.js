

var createKnight = function(owner) {
    return new Unit(owner, 8, 3, 15, 1, 1);
}

var createElf = function(owner) {
    return new Unit(owner, 5, 1, 10, 3, 3);
}

var createDwarf = function(owner) {
    return new Unit(owner, 6, 2, 12, 2, 2);
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
    this.setWorldPos = function(x, y) { if(x && y) { worldPos = new Point(x, y); } }

    this.getHealth = function() { return curHealth; }
    this.getMaxHealth = function() { return this.health; }  

    this.isDead = function() { return curHealth <= 0; }

    this.place = function(board, pos) {
        if(!board || !pos) { return; }
    
        if(placed) 
            throw ("Attempting to place a game piece for a second time!");
    
        this.board = board;
        placed = true;
        boardPos = pos;
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

        drawer.drawRect(new Rect(worldPos.x, worldPos.y, 30, 30));
    };
}

//Try this later
// Unit.prototype.attack = function(otherUnit) {
//     otherUnit.takeDamage(this.damage);
// }
