
var Rect = function(x, y, w, h) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.width = this.w;
    this.height = this.h;
};

Rect.prototype.contains = function(pos) {
    if(!pos) { throw("ERROR : Missing argument for Rect.contains!"); }
    
    return (pos.x > this.x && 
            pos.x < (this.x + this.w) &&
            pos.y > this.y &&
            pos.y < (this.y + this.h));
}