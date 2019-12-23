const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}
const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => { // si no coincide te regresa un -1
        return tarea.descripcion === descripcion;
    });
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let borrar_descripcion = listadoPorHacer.filter(descripcion1 => {
        return descripcion1.descripcion !== descripcion;
    });

    if (listadoPorHacer.length === borrar_descripcion.length) {
        return "No se pudo borrar el elemento";
    } else {
        listadoPorHacer = borrar_descripcion;
        guardarDB();
        return "Elemento borrado";
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}