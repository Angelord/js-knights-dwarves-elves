

var PlacementLogic = function(board, players) {

    var boardRef = board;
    var playersRef = players;

    var curPlayer = 0;

    var selectedUnit = false;

    this.initialize = function() {

        var canvas = document.getElementById("canvas");
    
        canvas.addEventListener("drag", function(e) {
            //Move unit
        });
    
        canvas.addEventListener("dragstart", function(e) {
            //Check if is in range
        });
    
        canvas.addEventListener("dragend", function(e) {
            //Check map position

            selectedUnit = false;
        });
    };

    this.destroy = function() { 

        canvas.removeEventListener("drag");
        canvas.removeEventListener("dragstart");    
        canvas.removeEventListener("dragend");    
    };

    this.update = function() {

    };
    
};