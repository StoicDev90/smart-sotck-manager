class Recurso
{
    id_recurso = null;
    tipo = null;
    fecha_creacion = null;
    fecha_ultima_actualizacion = null;
    ultima_actualizacion_por = null;
    fecha_baja = null;
    estado = '';
    datos_cpu = null;
    datos_celular = null;
    datos_monitor = null;

    constructor(obj) 
    {
        for (var prop in obj)
            this[prop] = obj[prop];
    }
}

export default Recurso;