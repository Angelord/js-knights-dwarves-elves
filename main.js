
var canvas = document.getElementById("canvas");
var drawer = new Drawer(canvas);
var game = new Game();
var fps = 60;
var lastFrameTime;
var started = false;

window.addEventListener('load', function(e) {
    if(!started) {
        requestAnimationFrame(main);
        started = true;
    }
});

// Main game loop
function main(time) {
    
    if(time < lastFrameTime + 1000 / fps) {
        requestAnimationFrame(main);
        return;
    }

    lastFrameTime = time;

    game.update();

    drawer.clear();

    game.draw(drawer);

    requestAnimationFrame(main);
}