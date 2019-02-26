
var EmptyLogic = function() {

    this.toString = function() { return "empty"; }
    this.onEnter = function() { }
    this.onExit = function() { }
    this.getCurPlayer = function() { return 0; }
    this.select = function(boardPos) { return false; }
    this.deselect = function() { }
    this.place = function(boardPos) { return false; }  
};