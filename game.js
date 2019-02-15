

var Game = function() {

    var board = new Board();
    var players = [ new Player(), new Player() ];
    
    var logic = new PlacementLogic(board);

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