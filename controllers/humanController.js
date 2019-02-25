

var HumanController = function(board, players, logic) {

    var logicRef = logic;

    var raycastTargets = [];

    var selectedPiece = null;
    var selectedPieceStartingPos = null;

    addListeners();

    players.forEach(player => {
        player.units.forEach(unit => {
            raycastTargets.push(unit);
        });
    });

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

        raycastTargets.forEach(target => {
            if(target.raycast && target.raycast(mousePos) && select(target)) {
                return;
            };
        });
    };

    function onMouseMove(e) {
        if(selectedPiece) {
            var mousePos = new Point(e.offsetX, e.offsetY);
            selectedPiece.setWorldPos(mousePos);
        }
    };

    function onMouseUp(e) {
        if(selectedPiece) {

            var mousePos = new Point(e.offsetX, e.offsetY);
            mousePos = board.worldToBoardPos(mousePos);

            if(!logicRef.place(mousePos)) {
                selectedPiece.setWorldPos(selectedPieceStartingPos);
            }

            deselect();
        }
    };

    function select(newObject) {
        if(!newObject) { return false; }

        if(!logicRef.select(newObject)) {
            console.log("Failed to select");
            return false;
        }

        if(selectedPiece) {
            deselect();
        }

        selectedPiece = newObject;
        selectedPieceStartingPos = newObject.getWorldPos();

        return true;
    };

    function deselect() {
        selectedPiece = null;
        selectedPieceStartingPos = null;
    };
}