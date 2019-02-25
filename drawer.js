
// An abstraction over the canvas
var Drawer = function(canvas) {

    var context = canvas.getContext('2d');

    this.drawRect = function(rect, color) {
        if(!rect) { throw("Missing argument!"); }

        var colorRef = color ? color : "#CCCCCC";

        context.fillStyle = colorRef;

        context.fillRect(rect.x, rect.y, rect.w, rect.h);
    };

    this.drawText = function(text, font, pos, color) {
        if(!text || !font || !pos) { throw("Missing argument(s)"); }
        
        var colorRef = color ? color : "#BBBBBB";

        context.font = font;
        context.fillStyle = colorRef;
        context.textAlign = "center";
        context.fillText(text, pos.x, pos.y); 
    }

    this.clear = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };
};