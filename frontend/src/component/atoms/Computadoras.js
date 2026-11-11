
export const Computadoras = {
    formatear:function(a) {
        if (!a) return "Vigente";
        let date = new Date(a);
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleString('es-AR', options);
    },
    mapearCompus: function(_computadoras) 
    {
        const returnComputadoras = [];
        _computadoras.map((computadora) => (
            returnComputadoras.push(
                {
                    id: computadora.recurso.id_recurso,
                    id_datos: computadora.id_cpu,
                    fecha_baja: computadora.recurso.fecha_baja,
                    tipo: computadora.recurso.tipo.nombre,
                    nombre: computadora.nombre,
                    tag: computadora.tag,
                    serial_number: computadora.serial_number,
                    marca: computadora.modelo.marca.nombre,
                    modelo: computadora.modelo.nombre,
                    asignaciones: computadora.recurso.asignaciones,
                    asignado_a: null,
                    ip: computadora.ip,
                    gw:computadora.gw,
                    sm: computadora.sm,
                    numero_telefono: '',
                    logs: computadora.recurso.logs,
                    motivo: null
                }
            )
        ))
        return returnComputadoras;
    },
    mapearCelulares: function(_celulares)
    {
        const returnCelulares = [];
        _celulares.map((celular) => (
            returnCelulares.push(
                {
                    id: celular.recurso.id_recurso,
                    id_datos: celular.id_celular,
                    tipo: celular.recurso.tipo.nombre,
                    fecha_baja: celular.recurso.fecha_baja,
                    nombre: '',
                    tag: '',
                    serial_number: celular.serial_number,
                    marca: celular.modelo.marca.nombre,
                    modelo: celular.modelo.nombre,
                    asignaciones: celular.recurso.asignaciones,
                    asignado_a: null,
                    ip: '',
                    gw: '',
                    sm: '',
                    numero_telefono: celular.numero_linea,
                    logs: celular.recurso.logs,
                    motivo: null
                }
            )
        ))
        return returnCelulares;
    },
    mapearMonitores: function(_monitores)
    {
        const returnMonitores = [];
        _monitores.map((monitor) => (
            returnMonitores.push(
                {
                    id: monitor.recurso.id_recurso,
                    id_datos: monitor.id_monitor,
                    tipo: monitor.recurso.tipo.nombre,
                    fecha_baja: monitor.recurso.fecha_baja,
                    nombre: monitor.nombre,
                    tag: monitor.tag,
                    serial_number: monitor.serial_number,
                    marca: monitor.modelo.marca.nombre,
                    modelo: monitor.modelo.nombre,
                    asignaciones: monitor.recurso.asignaciones,
                    asignado_a: null,
                    ip: '',
                    gw:'',
                    sm: '',
                    numero_telefono: '',
                    logs: monitor.recurso.logs,
                    motivo: null
                }
            )
        ))
        return returnMonitores;
    },
    mapearLicencias: function(_licencias)
    {
        const returnLicencias = [];
        _licencias.map((licencia) => (
            returnLicencias.push(
                {
                    id: licencia.recurso.id_recurso,
                    id_datos: licencia.id_licencia,
                    tipo: licencia.recurso.tipo.nombre,
                    fecha_baja: licencia.recurso.fecha_baja,
                    nombre: licencia.nombre,
                    tag: '',
                    serial_number: 'Desde: ' + this.formatear(licencia.fecha_desde?.split("T")[0]),
                    marca: 'Hasta: ' + this.formatear(licencia.fecha_hasta?.split("T")[0]),
                    modelo: '',
                    asignaciones: licencia.recurso.asignaciones,
                    asignado_a: null,
                    ip: '',
                    gw:'',
                    sm: '',
                    numero_telefono: '',
                    logs:licencia.recurso.logs,
                    motivo: null
                }
            )
        ))
        return returnLicencias;
    }
}