
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var CollectionUtil = {};

CollectionUtil.removeSpecific = function(array, value) {
    var index = array.indexOf(value);

    if(index > -1) {
        array.splice(index, 1);
        return true;
    }

    return false;
};