

var HumanController = function(board, players, logic) {

    var logicRef = logic;

    var selectedUnit = null;
    var selectedUnitStartingPos = null;

    addListeners();

    this.setLogic = function(value) { 
        deselect();
        logicRef = value; 
    }

    function addListeners() {
        var canvas = document.getElementById("canvas");
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", onMouseUp);
    };

    function onMouseDown(e) {
        var mousePos = new Point(e.offsetX, e.offsetY);

        var curPlayerUnits = logicRef.getCurPlayer().units;
        for(var i = 0; i < curPlayerUnits.length; i++) {
            var unit = curPlayerUnits[i];
            if(unit.raycast(mousePos)) {
                select(unit);
                break;
            }
        }
    };

    function onMouseMove(e) {
        if(selectedUnit) {
            var mousePos = new Point(e.offsetX, e.offsetY);
            selectedUnit.setWorldPos(mousePos);
        }
    };

    function onMouseUp(e) {
        if(selectedUnit) {

            var mousePos = new Point(e.offsetX, e.offsetY);
            mousePos = board.worldToBoardPos(mousePos);

            if(!logicRef.placeUnit(mousePos)) {
                selectedUnit.setWorldPos(selectedUnitStartingPos);
            }

            deselect();
        }
    };

    function select(unit) {
        if(!unit) { return; }

        if(!logicRef.selectUnit(unit)) {
            console.log("Failed to select");
            return;
        }

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
}