class Datos_celular
{
    id_celular = null;
    serial_number = '';
    modelo = null;
    numero_linea = '';
    recurso = {
        tipo: {
            id: null
        },
        estado: '',
        fecha_creacion: null,
        ultima_actualizacion_por: {
            id_usuario: null
        }
    };

    constructor(obj) {
        for (var prop in obj)
            this[prop] = obj[prop];
    }

    
    setRecurso(recurso) {
        this.recurso = recurso;
    }
}

export default Datos_celular;