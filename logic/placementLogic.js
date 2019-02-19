
var PlacementLogic = function(board, players) {

    var MAX_SELECT_DIST = 15;

    var boardRef = board;
    var playersRef = players;

    var curPlayer = 0;

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
            var mousePos = new Point(e.clientX, e.clientY);
            selectedUnit.setWorldPos(mousePos);
        }
    }

    function onMouseDown(e) {
        var mousePos = new Point(e.clientX, e.clientY);

        var curPlayerUnits = players[curPlayer].units;
        for(var i = 0; i < curPlayerUnits.length; i++) {
            var unit = curPlayerUnits[i];
            if(mousePos.distance(unit.getWorldPos()) <= MAX_SELECT_DIST) {
                select(unit);
                break;
            }
        }
    };

    function onMouseUp(e) {
        if(selectedUnit) {
            selectedUnit.setWorldPos(selectedUnitStartingPos);
            deselect();
        }
    };

    function select(unit) {
        if(!unit) { return; }

        if(selectedUnit) {
            throw ("Attempting to select a unit when one is already selected");
        }

        selectedUnit = unit;
        selectedUnitStartingPos = unit.getWorldPos();
    };

    function deselect() {
        selectedUnit = null;
        selectedUnitStartingPos = null;
    };
};

