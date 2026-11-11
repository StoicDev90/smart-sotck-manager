class Datos_monitor
{
    id_monitor = null;
    nombre = '';
    tag = null;
    serial_number = '';
    modelo = null;
    recurso = {
        id_recurso: null
    }

    constructor (obj) 
    {
        for (var prop in obj)
            this[prop] = obj[prop];
    }
    setRecurso(recurso) {
        this.recurso = recurso;
    }
}

export default Datos_monitor;