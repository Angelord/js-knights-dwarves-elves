
//A description of what interface a logic object should support

var Logic = function() {

    this.onEnter = function() { }
    this.onExit = function() { }
    this.getCurPlayer = function() { return 0; }
    //Returns false if selection fails and true if it succeeds
    this.select = function(boardPos) { return false; }
    this.deselect = function() { }
    //Returns false if placement fails and true if it succeeds
    this.place = function(boardPos) { return false; }  
    // this.heal = function() { }
};