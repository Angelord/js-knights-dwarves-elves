

var Game = function() {

    var board = new Board();
    var logic = new PlacementLogic();
    
    var players = [ new Player(), new Player() ];

    this.update = function() {
        
        board.update();
        logic.update();
    };

    this.draw = function(drawer) {

        board.draw(drawer);

        units.forEach(unit => {
            unit.draw(drawer);
        });
    };
};