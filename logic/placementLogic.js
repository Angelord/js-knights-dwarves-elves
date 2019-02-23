
var PlacementLogic = function(board, players) {

    var MAX_SELECT_DIST = 15;

    var boardRef = board;
    var playersRef = players;

    var curPlayer = 0;
    board.highlightPlayerRegion(curPlayer);

    var selectedUnitStartingPos = null;
    var selectedUnit = null;

    var mousePos = new Point(0, 0);
    var canvas = document.getElementById("canvas");

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);


    this.update = function() {
        
    };

    function onMouseMove(e) {
        if(selectedUnit) {
            var mousePos = new Point(e.offsetX, e.offsetY);
            selectedUnit.setWorldPos(mousePos);
        }
    }

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
                curPlayer = (curPlayer == 1) ? 0 : 1;
                board.highlightPlayerRegion(curPlayer);
            }
            else {
                selectedUnit.setWorldPos(selectedUnitStartingPos);
            }

            deselect();
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
};

