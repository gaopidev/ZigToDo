require('colors');
const { inMenu } = require('./helpers/inquirer');
// const { mostarMenu, pausa } = require('./helpers/mensajes');
console.clear();

const main = async() => {
    console.log('Bienvenido a ZigToDo'.blue);
    let opt = '';
    do {
        // Espera a seguir hasta que obtengamos una respuesta
        opt = await inMenu();
        console.log({ opt });
        // if( opt !== '0' ) await pausa();
    } while( opt !== '0' )

    // pausa();
}

main();