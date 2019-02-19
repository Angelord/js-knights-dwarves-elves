
// An abstraction over the canvas
var Drawer = function(canvas) {

    var context = canvas.getContext('2d');

    this.drawRect = function(rect, color) {
        if(!rect) { return; }

        var colorRef = color ? color : "#CCCCCC";

        context.fillStyle = colorRef;

        context.fillRect(rect.x, rect.y, rect.w, rect.h);
    };

    this.clear = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };
};