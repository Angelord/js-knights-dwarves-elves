
// An abstraction over the canvas
var Drawer = function(canvas) {

    var context = canvas.getContext('2d');

    this.drawRect = function(rect) {
        context.fillRect(rect.x, rect.y, rect.w, rect.h);
    };

    this.clear = function() {
        context.fillRect(0, 0, canvas.width, canvas.height);
    };
};