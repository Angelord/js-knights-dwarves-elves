
//A description of what interface a logic object should support

var Logic = function() {

    this.onEnter = function() { }
    this.onExit = function() { }
    this.getCurPlayer = function() { return 0; }
    //Returns false if selection fails and true if it succeeds
    this.selectUnit = function(boardPos) { return false; }
    //Returns false if placement fails and true if it succeeds
    this.placeUnit = function(boardPos) { return false; }  
    // this.heal = function() { }
};