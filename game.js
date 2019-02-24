

var Game = function() {

    var board = new Board();
    this.getBoard = function() { return board; } 

    var pieces = [];
    this.addPiece = function(piece) { pieces.push(piece); }

    var players = [ new Player(0, this), new Player(1, this) ];
    this.getPlayers = function() { return players; }
    
    var logic = new PlacementLogic(board, players, changeLogic);
    logic.onEnter();
    this.getLogic = function() { return logic; };
    
    var controller = new HumanController(board, players, logic);

    
    this.update = function() { };

    this.draw = function(drawer) {

        board.draw(drawer);

        pieces.forEach(piece => {
            piece.draw(drawer);
        });
    };

    function changeLogic(newLogic) {
        if(logic) { logic.onExit(); }

        logic = newLogic;

        if(newLogic) {
            newLogic.onEnter();
        }
        controller.setLogic(newLogic);
    };
};