

var Button = function(rect, text, font, color, focusedColor, pressedColor, textColor) {

    if(arguments.length != 7) { throw("Missing argument(s)!"); }

    var instance = this;
    var curColor = color;
    var focused = false;

    var canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("click", onClick);

    function onClick(e) {
        if(instance.onClick) {
            instance.onClick();
        }
    };

    function onMouseMove(e) {
        var mousePos = new Point(e.offsetX, e.offsetY);
         
        var contains = rect.contains(mousePos);
        if(!focused && contains) {
            focused = true;
            onFocus();
        }
        else if(focused && !contains) {
            focused = false;
            onFocusLost();
        }
    };

    function onFocus() {
        curColor = focusedColor;
    };

    function onFocusLost() {
        curColor = color;
    };

    function onMouseDown(e) {
        if(focused) { 
            curColor = pressedColor;
        }
    };

    function onMouseUp(e) {
        curColor = focused ? focusedColor : color;
    };

    this.draw = function(drawer) {
        drawer.drawRect(rect, curColor);
        drawer.drawText(text, font, rect.getCenter(), textColor);
    };
};