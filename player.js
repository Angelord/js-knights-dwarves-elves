
var Player = function() {
    
    this.units = [
        new Knight(this), new Knight(this),
        new Elf(this), new Elf(this),
        new Dwarf(this), new Dwarf(this)
    ];

    
};