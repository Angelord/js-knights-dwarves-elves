
var canvas = document.getElementById("canvas");
var drawer = new Drawer(canvas);
var game = new Game();
var fps = 60;
var lastFrameTime;

requestAnimationFrame(main);

// Main game loop
function main(time) {
    
    if(time < lastFrameTime + 1000 / fps) {
        requestAnimationFrame(main);
        return;
    }

    lastFrameTime = time;

    game.update();

    // drawer.clear();

    game.draw(drawer);

    requestAnimationFrame(main);
}

canvas.addEventListener("mousedown", function(e) { } );
canvas.addEventListener("click", function(e) { } );
canvas.addEventListener("mouseup", function(e) { } );


//Draw in memory only
// context.rect(10, 10, 100, 100)

//Visualize
// context.fill()
