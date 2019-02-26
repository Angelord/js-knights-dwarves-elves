
var Potion = function(startingPos) {

    var raycastSize = new Point(60, 60);
    var worldPos = startingPos;
    var worldDrawOffset = new Point( -raycastSize.x/2, -raycastSize.y/2 );
    
    this.type = "potion";

    this.getWorldPos = function() {
        return worldPos;
    };

    this.setWorldPos = function(value) {
        if(typeof value == 'undefined') { throw("Missing argument!"); }
        worldPos = value;
    };

    this.raycast = function(pos) {

        var offsetPos = worldPos.add(worldDrawOffset);
        var boundingRect = new Rect(offsetPos.x, offsetPos.y, raycastSize.x, raycastSize.y);

        return boundingRect.contains(pos);
    };

    this.draw = function(drawer) {

        var offsetPos = worldPos.add(worldDrawOffset);
        drawer.drawImage("potion", worldPos.add(worldDrawOffset), raycastSize);
    };

    this.heal = function(unit) {

        dice.clear();
        dice.roll(1);

        var healAmount = dice.getResult(0);
        unit.heal(healAmount);

        console.log("Healing " + unit + " for " + healAmount);
    };
};