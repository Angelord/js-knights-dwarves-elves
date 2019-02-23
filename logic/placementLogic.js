
var PlacementLogic = function(board, players, changeLogicCallback) {

    if(!board || !players || !changeLogicCallback) { throw("Missing argument(s)!");  }

    var MAX_SELECT_DIST = 15;

    var boardRef = board;
    var playersRef = players;

    var curPlayer = 0;
    board.highlightPlayerRegion(curPlayer);

    var selectedUnitStartingPos = null;
    var selectedUnit = null;
    var canvas = document.getElementById("canvas");
    addListeners();

    function onMouseMove(e) {
        if(selectedUnit) {
            var mousePos = new Point(e.offsetX, e.offsetY);
            selectedUnit.setWorldPos(mousePos);
        }
    };

    function onMouseDown(e) {
        var mousePos = new Point(e.offsetX, e.offsetY);

        var curPlayerUnits = players[curPlayer].units;
        for(var i = 0; i < curPlayerUnits.length; i++) {
            var unit = curPlayerUnits[i];
            if(!unit.isPlaced() && unit.raycast(mousePos)) {
                select(unit);
                break;
            }
        }
    };

    function onMouseUp(e) {
        if(selectedUnit) {

            var mousePos = new Point(e.offsetX, e.offsetY);
            mousePos = board.worldToBoardPos(mousePos);

            if(board.highlightContains(mousePos) && !board.getPiece(mousePos)) {
                selectedUnit.place(board, mousePos);
                endTurn();
            }
            else {
                selectedUnit.setWorldPos(selectedUnitStartingPos);
            }

            deselect();
        }
    };

    function endTurn() {
        curPlayer = (curPlayer == 1) ? 0 : 1;
        
        var unplacedUnits = 0;
        players[curPlayer].units.forEach(unit => {
            unplacedUnits += unit.isPlaced() ? 0 : 1;
        });

        if(unplacedUnits == 0) {
            removeListeners();
            changeLogicCallback(new BattleLogic(board, players));
            board.clearHighlight();
        }
        else {
            board.highlightPlayerRegion(curPlayer);
        }
    };

    function select(unit) {
        if(!unit) { return; }

        if(selectedUnit) {
            deselect();
        }

        selectedUnit = unit;
        selectedUnitStartingPos = unit.getWorldPos();
    };

    function deselect() {
        selectedUnit = null;
        selectedUnitStartingPos = null;
    };

    function addListeners() {
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
    };

    function removeListeners() {
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mouseup", onMouseUp);
    };
};

