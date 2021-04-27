require('colors');
const { inMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardar');
const Tareas = require('./models/tareas');

const main = async() => {

    console.log('Bienvenido a ZigToDo'.blue);

    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();
    if ( tareasDB ){
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        opt = await inMenu();
        //console.log( {opt} );

        switch ( opt ){
            case '1': {
                const desc = await leerInput( 'Descripcion: ');
                // console.log(desc);
                tareas.crearTarea( desc );
                break;
            }

            case '2': {
                tareas.listadoCompleto();
                break;
            }

            case '3': { // Listar completadas
                tareas.listarPendComp(true);
                break;
            }

            case '4': { // Listar pendientes
                tareas.listarPendComp(false);
                break;
            }

            case '5': { // Completar tareas
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
            }

            case '6': { // Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0' ){
                    const ok = await confirmar( "¿Estas seguro de borrar este elemento?" );
                    if( ok ){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada'.yellow);
                    }
                }
            }
        }

        guardarDB( tareas.listadoArr );

        await pausa();

    } while( opt !== '0' )

    
}

main();