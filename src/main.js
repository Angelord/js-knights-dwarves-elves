
var FPS = 60;

var canvas = document.getElementById("canvas");
var drawer = new Drawer(canvas);
var game = new Game();
var lastFrameTime;
var started = false;

window.addEventListener('load', function(e) {
    if(!started) {
        requestAnimationFrame(main);
        started = true;
    }
});

/**
 * The main game loop. Called once per frame, 60 times per second.
 * @param {number} time           Total time since execution started.
 */
function main(time) {
    
    //Lock to our target frame rate
    if(time < lastFrameTime + 1000 / FPS) {
        requestAnimationFrame(main);
        return;
    }

    lastFrameTime = time;

    drawer.clear();

    game.draw(drawer);

    requestAnimationFrame(main);
}