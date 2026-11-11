class Asignacion
{
    id = null;
    fecha_alta = null;
    fecha_baja = null;
    asignado_a = {
        login: null
    };
    asignado_por = {
        id_usuario: null
    };
    ceco = {
        id_ceco: null
    };
    celo = {
        id_celo: null
    }
    recurso = {
        id_recurso: null
    };

    constructor(obj){
        for (var prop in obj)
            this[prop] = obj[prop];
    }
}
export default Asignacion;