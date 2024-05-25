const path = require('path');

module.exports = {
    port: 8080,
    host: '0.0.0.0',
    staticReg: path.join(__dirname, "..", "..", "client"),  // Chemin vers le répertoire des fichiers statiques
    viewsReg: path.join(__dirname, "..", "..", "client", "index.html"),  // Chemin vers le répertoire des vues HTML  
    lengthGrid: 15,
    power_timer : (15 * 1000) + 62.5,
    BLOCK_CELL:"B",
    BOMB_TIMER:(2 * 1000) + 62.5,
    DEFAULT_BOMB_AMOUNT: 1,
    EXTRA_BOMB:"X", 
    EXTRA_LIFE:"L",
    MANUAL_BOMB:"M",
    POWER_UP_TIMER:(15 * 1000) + 62.5,
    SUPER_BOMB:"S",
    WALL_CELL:"W",
    // POWER_UP_TYPES : [EXTRA_BOMB, SUPER_BOMB, MANUAL_BOMB, EXTRA_LIFE]
};
