
var MIN_OBSTACLES = 1;
var MAX_OBSTACLES = 5;

var BattleLogic = function(game) {

    var curPlayer = 0;
    var selectedPiece = null;
    var selectedUnitMovements = null;
    var selectedUnitAttacks = null;
    var board = game.getBoard();
    var players = game.getPlayers();
    var potion = game.getPotion();

    this.toString = function() { return "battle"; }

    this.onEnter = function() { 
        console.log("Entering battle");
        placeObstacles();
    }

    this.onExit = function() { }
    this.getCurPlayer = function() { return players[curPlayer]; }

    this.select = function(gamePiece) { 

        if(gamePiece.type == "unit") {

            if(!players[curPlayer].owns(gamePiece)) {
                return false;
            }
            
            selectedPiece = gamePiece;
            selectedUnitMovements = pathfinding.getArea(
                board, 
                gamePiece.getBoardPos(), 
                gamePiece.getMovement(),
                gamePiece.canTraverse,
                gamePiece.canStandOn);

            selectedUnitAttacks = pathfinding.getArea(
                board, 
                gamePiece.getBoardPos(), 
                gamePiece.getAttRange(),
                gamePiece.canAttackThrough,
                gamePiece.canAttackTarget);


            board.highlightPositions(selectedUnitMovements, "#11115588");
            board.highlightPositions(selectedUnitAttacks, "#55111188");

            return true; 
        }
        else if(gamePiece.type == "potion") {
            
            selectedPiece = gamePiece;

            return true;
        }

        return false;
    };

    this.deselect = function() {

        selectedPiece = null;
        selectedUnitMovements = null;
        selectedUnitAttacks = null;
        board.clearHighlight();
    };

    this.place = function(boardPos) {

        if(!selectedPiece) { return false; }

        if(selectedPiece.type == "unit") {
            return placeUnit(boardPos);
        }
        else if(selectedPiece.type == "potion") {
            return placePotion(boardPos);
        }

        this.deselect();

        console.log("Invalid placement " + boardPos);
        return false; 
    }; 

    function placePotion(boardPos) {
        
        if(selectedPiece.empty) { return false; }

        var pieceToHeal = board.getPiece(boardPos);

        if(!pieceToHeal || pieceToHeal.type != "unit") { 
            return false; 
        }

        if(!players[curPlayer].owns(pieceToHeal)) { 
            console.log("Can't heal opponent's units!");
            return false;
        }

        if(pieceToHeal.getHealth() == pieceToHeal.getMaxHealth()) { 
            console.log("Unit already at max health!");
            return false; 
        }

        selectedPiece.heal(pieceToHeal);

        var repeatTurnChance = dice.roll(1);
        if(repeatTurnChance % 2 == 0) {

            endTurn();
        }

        return false;
    };

    function placeUnit(boardPos) {

        if(tryMove(boardPos)) {
            return true;
        }
        else if(tryAttack(boardPos)) {
            return false;
        }
    };

    function tryMove(boardPos) {

        var posIsValid = selectedUnitMovements.some(
            movePos => { return movePos.equals(boardPos); }
        );
        
        if(posIsValid) {

            selectedPiece.remove();
            selectedPiece.place(board, boardPos);

            endTurn();

            return true;
        }

        return false;
    };

    function tryAttack(boardPos) {

        var posIsValid = selectedUnitAttacks.some(
            attackPos => { return attackPos.equals(boardPos); }
        );

        if(posIsValid) {

            selectedPiece.attack(boardPos);

            endTurn();

            return true;
        }

        return false;
    };

    function endTurn() {

        board.clearHighlight();

        potion.empty = false;
        
        if(players.some(player => { return player.lost() })) {
            game.end();
        }

        curPlayer = (curPlayer == 1) ? 0 : 1;
    };

    function placeObstacles() {

        var battleRect = board.getBattlefieldRect();

        var emptyTiles = board.getEmptyPositions(battleRect);
        
        var numObstacles = getRandomInt(MIN_OBSTACLES, MAX_OBSTACLES);

        console.log("Placing " + numObstacles + " obstacles.");

        for(var i = 0; i < numObstacles; i++) {
            var position = emptyTiles[getRandomInt(0, emptyTiles.length - 1)];
            board.setPiece(position, "obstacle");
            emptyTiles.pop(position);
        };
    };
};