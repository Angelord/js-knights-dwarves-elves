
var Point = function(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function() {
    return "{ " + this.x + ", " + this.y + " }";
}

Point.prototype.add = function(other) {
    return new Point(this.x + other.x, this.y + other.y);
};

Point.prototype.sub = function(other) {
    return new Point(this.x - other.x, this.y - other.y);
};

Point.prototype.distance = function(other) {
    return this.sub(other).magnitude();
}

Point.prototype.magnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}