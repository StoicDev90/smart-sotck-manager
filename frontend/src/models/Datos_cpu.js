class Datos_cpu
{
    id_cpu = null;
    nombre = '';
    tag = null;
    serial_number = '';
    modelo = null;
    ip = '';
    gw = '';
    sm = '';
    recurso = {
        id_recurso: null
    }

    constructor(obj)
    {
        for (var prop in obj) this[prop] = obj[prop];
    }
    setRecurso(recurso) {
        this.recurso = recurso;
    }
}

export default Datos_cpu;