

var Game = function() {

    var board = new Board();
    var pieces = [];

    this.addPiece = function(piece) {
        if(piece) {
            pieces.push(piece);
        }
    };

    var players = [ new Player(0, this), new Player(1, this) ];

    var logic = new PlacementLogic(board, players);

    this.update = function() {
        
        board.update();
        logic.update();
    };

    this.draw = function(drawer) {

        board.draw(drawer);

        pieces.forEach(piece => {
            piece.draw(drawer);
        });
    };
};