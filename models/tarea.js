const { v4 } = require('uuid');

class Tarea {
    // Propiedades
    id = '';
    desc = '';
    completoEn = null;

    constructor( desc ) {
        this.id = v4();
        this.desc = desc;
        this.completoEn = null;
    }
}

module.exports = Tarea;