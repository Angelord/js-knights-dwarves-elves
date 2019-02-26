

var Button = function(rect, text, color, focusedColor, pressedColor, textColor) {

    var rectRef = rect ? rect : new Rect(0, 0, 0, 0);
    var textRef = text ? text : "";

    var curColor = color;

    this.setSize = function(sz) {
        rectRef.w = sz.x;
        rectRef.h = sz.y;
    };

    this.setPosition = function(pos) { 
        rectRef.x = pos.x;
        rectRef.y = pos.y;
    };

    this.raycast = function(pos) {
        return rectRef.contains(pos);
    };

    this.draw = function(drawer) {
        drawer.drawRect(rectRef, curColor);
    };

    this.onFocus = function() {
        curColor = focusedColor;
    };

    this.onFocusLost = function() {
        curColor = color;
    };

    this.onMouseDown = function() {
        curColor = pressedColor;
    };

    this.onMouseUp = function() {
        curColor = focusedColor;
    };
};