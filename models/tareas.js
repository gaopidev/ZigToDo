const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr () {
        const lista = [];
        // Regresa un array de llaves
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            lista.push( tarea );
        });
        
        return lista;
    }

    constructor(){
        this._listado = {};
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach( tarea => { 
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach( (tarea, id) => {
            const idx = `${id+1}`.green;
            const { desc, completoEn } = tarea;
            const estado = ( completoEn ) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx}. ${desc} :: ${estado}`);
        });
    }

    listarPendComp( completadas = true ){
        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => {
            const { desc, completoEn } = tarea;
            const estado = ( completoEn ) ? 'Completada'.green : 'Pendiente'.red;
            if( completadas ) {
                if( completoEn ){
                    contador += 1;
                    console.log(`${(contador + ".").green} ${desc} :: ${completoEn.green}`)
                }
            } else {
                if( !completoEn ){
                    contador += 1;
                    console.log(`${(contador + ".").green} ${desc} :: ${estado}`)
                }
            }
        });
    }

    borrarTarea( id = '' ){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    toggleCompletadas( ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completoEn ){
                tarea.completoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completoEn = null;
            }
        });
    }
}
module.exports = Tareas;