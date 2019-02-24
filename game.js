

var Game = function() {

    var board = new Board();
    var pieces = [];

    this.addPiece = function(piece) {
        if(piece) {
            pieces.push(piece);
        }
    };

    var players = [ new Player(0, this), new Player(1, this) ];
    var logic = new PlacementLogic(board, players, changeLogic);

    this.getLogic = function() {
        return logic;
    };

    this.update = function() {
        board.update();
    };

    this.draw = function(drawer) {

        board.draw(drawer);

        pieces.forEach(piece => {
            piece.draw(drawer);
        });
    };

    function changeLogic(newLogic) {
        logic = newLogic;
    };
};