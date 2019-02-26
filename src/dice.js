
var DICE_OFFSET = new Point(580, 220);
var DICE_SZ = new Point(60, 60);
var DICE_SPACING = 10;

var dice = { 
    results : []
};

/**
 * Clears all previous die rolls
 */
dice.clear = function() {
    this.results = [];
};

/**
 * Rolls 'numDice' dice and returns the sum of their results. 
 * @param {number} numDice        How many dice to roll.
 */
dice.roll = function(numDice) {
    var numDiceRef = numDice ? numDice : 1;

    var sum = 0;
    for(var i = 0; i < numDice; i++) {
        var roll = getRandomInt(1, 6);
        this.results.push(roll);
        sum += roll;
    }

    console.log("Dice Roll : " + sum);

    return sum;
};

/**
 * Returns the total of all rolls since the last clear(). 
 */
dice.getTotal = function() {
    var sum = 0;
    for(var i = 0; i < results.length; i++) {
        sum += results[i];
    }
    return sum;
};

/**
 * Returns the result of the die at 'index'
 * @param {number} index        Which die result to return.
 */
dice.getResult = function(index) {
    if(typeof index == "undefined") { throw("Missing argument!"); }

    return this.results[index];
};

dice.draw = function(drawer) {
    if(!drawer) { throw("Missing argument(s)!"); }

    for(var i = 0; i < this.results.length; i++) {
        var pos = new Point(DICE_OFFSET.x + (DICE_SZ.x + DICE_SPACING) * i, DICE_OFFSET.y);

        drawer.drawRect(new Rect(pos.x, pos.y, DICE_SZ.x, DICE_SZ.y), "darkgrey");
        drawer.drawText(this.results[i], "24px Arial", pos.add(new Point( DICE_SZ.x / 2, DICE_SZ.y / 2 )), "white");
    };
};