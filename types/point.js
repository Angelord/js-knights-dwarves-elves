
var Point = function(x, y) {
    var xVal = x ? x : 0;
    var yVal = y ? y : 0;

    this.getX = function() { return xVal; }
    this.getY = function() { return yVal; }
}