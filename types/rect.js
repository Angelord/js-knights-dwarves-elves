
var Rect = function(x, y, w, h) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};

Rect.prototype.contains = function(pos) {
    if(!pos) { throw("Missing argument!"); }
    
    return (pos.x >= this.x && 
            pos.x < (this.x + this.w) &&
            pos.y >= this.y &&
            pos.y < (this.y + this.h));
};

Rect.prototype.getEdgeX = function() {
    return this.x + this.w;
};

Rect.prototype.getEdgeY = function() {
    return this.y  + this.h;
};

Rect.prototype.getPos = function() {
    return new Point(this.x, this.y);
};

Rect.prototype.getSize = function() {
    return new Point(this.w, this.h);
};