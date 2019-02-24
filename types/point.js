
var Point = function(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function() {
    return "{ " + this.x + ", " + this.y + " }";
};

Point.prototype.equals = function(other) {
    return (other.x == this.x && other.y == this.y);
};

Point.prototype.add = function(other) {
    return new Point(this.x + other.x, this.y + other.y);
};

Point.prototype.sub = function(other) {
    return new Point(this.x - other.x, this.y - other.y);
};

Point.prototype.distance = function(other) {
    return this.sub(other).magnitude();
};

Point.prototype.magnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Point.prototype.round = function() {
    return new Point(Math.round(this.x), Math.round(this.y));
};

Point.prototype.getNeighbours = function() {
    var neighbours = [];
    neighbours.push(new Point(this.x - 1, this.y));
    neighbours.push(new Point(this.x + 1, this.y));
    neighbours.push(new Point(this.x, this.y - 1));
    neighbours.push(new Point(this.y, this.y + 1));
    return neighbours;
};

