class Equipo
{
    id = null;
    tipo = null;
    tag = null;
    nombreEquipo = '';
    serialNumber = '';
    modelo = null;
    localidad = null;
    asignado_a= null;
    ip = '';
    gw = '';
    sm = '';
    numeroTelefono = '';

    constructor(obj) {
        for (var prop in obj) this[prop] = obj[prop];
    }
}

export default Equipo;