

var Knight = function(owner) {
    this = new Unit(owner, 8, 3, 15, 1, 1);
}

var Elf = function(owner) {
    this = new Unit(owner, 5, 1, 10, 3, 3);
}

var Dwarf = function(owner) {
    this = new Unit(owner, 6, 2, 12, 2, 2);
}

var Unit = function(owner, damage, armor, health, attRange, movement) {

    this = new GamePiece();

    this.damage = damage;
    this.armor = armor;
    this.health = health;
    this.attRange = attRange;
    this.movement = movement;

    var curHealth = health;
    var worldPos = new Point(0, 0);


    this.getWorldPos = function() { return worldPos; }
    this.setWorldPos = function(value) { if(value) { worldPos = value; } }

    this.getHealth = function() { return curHealth; }

    this.getMaxHealth = function() { return this.health; }  

    this.isDead = function() { return curHealth <= 0; }

    this.attack = function(otherUnit) {
        otherUnit.takeDamage(this.damage);
    }

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

    this.draw = function() {
        
        //Draw at world pos
    };
    
}

//Try this later
// Unit.prototype.attack = function(otherUnit) {
//     otherUnit.takeDamage(this.damage);
// }
