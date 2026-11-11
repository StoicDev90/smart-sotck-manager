import React, { useState, useEffect, Fragment } from 'react';
import { Api } from '../services/ApiService'
import { Toast } from 'bootstrap';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { defaultThemes } from 'react-data-table-component';
import ReactTooltip from 'react-tooltip';

import "../assets/styles/VerEquipos.css"
import { Computadoras } from '../component/atoms/Computadoras';
import CartelAsignacion from '../component/atoms/modals/ModalAsignacion.js';
import ConfirmarEliminado from '../component/atoms/ConfirmarEliminado'
import ModalHistorial from '../component/atoms/modals/ModalHistorial';
import ModalLogs from '../component/atoms/modals/ModalLogs';
import Modal from '../component/atoms/modal/modal';
import Can from '../component/Can.jsx'

import { getUser } from '../services/AuthService.js';
import { TIPOS_RECURSO } from '../constants/TiposRecurso.js';

export default function VerEquipos() {

    const [_computadoras, setComputadoras] = useState(null);
    const [_monitores, setMonitores] = useState(null);
    const [_celulares, setCelulares] = useState(null);
    const [_licencias, setLicencias] = useState(null);
    const [tipos, setTipos] = useState(null);

    const [_idModificar, setIdModificar] = useState(-1);
    const [_tipoModificar, setTipoModificar] = useState(null);
    const [_idAsignacion, setIdAsignacion] = useState(-1);
    const [_tituloModal, setTituloModal] = useState("");

    const [_filtrar, setFiltrar] = useState("");

    const opcionTodos = { value: null, label: "TODOS" };
    const [_tipoFiltro, setTipoFiltro] = useState(opcionTodos);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        leerRecursos();
        leerTipos();
    }, []);

    async function leerTipos() {
        const tiposPermitidos = getUser().tipos;

        await Api.get('tipo').then((elem) => {
            console.log(elem);
            console.log(tiposPermitidos);
            setTipos(
                elem.filter(t => tiposPermitidos.includes(t.nombre))
                    .map(t => ({
                        value: t.id,
                        label: t.nombre
                    }))
            )
        });
    }
    function modificarSeleccionado(e) {
        setTipoModificar({ value: e.value, label: e.label });
    }
    function cerrarModal() {
        setIdModificar(-1);
        setTipoModificar(null);
        setTituloModal("");
        setIsModalOpen(false); // Cierra el modal
        leerRecursos();
    }

    function mostrarAdd(e) {
        e.preventDefault();
        setIdModificar(-1);
        setTituloModal("Agregar recurso");
        setIsModalOpen(true); // Abre el modal
    }

    function getModalProps() {
        if (!_tipoModificar) return null;
        switch (_tipoModificar.label) {
            case 'MONITOR':
                return {
                    title: _idModificar > 0 ? "Editar Monitor" : "Agregar Monitor",
                    subtitle: "Monitor",
                    fields: [
                        { name: "marca", label: "Marca", type: "select", optionsKey: "marcas", placeholder: "Seleccionar Marca" },
                        { name: "modelo", label: "Modelo", type: "select", optionsKey: "modelos", placeholder: "Seleccionar Modelo" },
                        { name: "nombre", label: "Nombre", type: "text", placeholder: "Ingrese el nombre" },
                        { name: "serial", label: "Serial Number", type: "text", placeholder: "Ingrese el número de serie" },
                        { name: "tag", label: "Tag del equipo", type: "text", placeholder: "Ingrese el tag" },
                    ],
                    fetchData: async (id) => {
                        if (id > 0) {
                            const monitor = await Api.getMonitor(id);
                            return {
                                marca: { value: monitor.modelo.marca.id, label: monitor.modelo.marca.nombre },
                                modelo: { value: monitor.modelo.id, label: monitor.modelo.nombre },
                                nombre: monitor.nombre,
                                serial: monitor.serial_number,
                                tag: monitor.tag,
                            };
                        }
                        return {};
                    },
                    fetchOptions: async () => {
                        const marcas = await Api.get("marca");
                        const modelosRaw = await Api.get("modelo");

                        const marcasFiltradas = marcas.filter(
                            marca => marca.tipos.some(
                                tipo => tipo.id === TIPOS_RECURSO.MONITOR
                            )
                        );

                        const modelosFiltrados = modelosRaw.filter(
                            modelo => modelo.tipo.id === TIPOS_RECURSO.MONITOR
                        );

                        return {
                            marcas: marcasFiltradas.map((marca) => ({ value: marca.id, label: marca.nombre })),
                            modelos: modelosFiltrados.map((modelo) => ({ value: modelo.id, label: modelo.nombre, marca: modelo.marca })),
                        };
                    },
                    onSubmit: async (formData) => {
                        const payload = {
                            id_monitor: _idModificar > 0 ? _idModificar : null,
                            id_modelo: formData.modelo.value,
                            nombre: formData.nombre,
                            serial_number: formData.serial,
                            tag: formData.tag ? parseInt(formData.tag, 10) : null,
                        };
                        await Api.guardarMonitor(payload);
                        cerrarModal();
                    },
                };

            case 'CELULAR':
                return {
                    title: _idModificar > 0 ? "Editar Celular" : "Agregar Celular",
                    subtitle: "Celular",
                    fields: [
                        { name: "marca", label: "Marca", type: "select", optionsKey: "marcas", placeholder: "Seleccionar Marca" },
                        { name: "modelo", label: "Modelo", type: "select", optionsKey: "modelos", placeholder: "Seleccionar Modelo" },
                        { name: "serial", label: "Serial", type: "text", placeholder: "Ingrese el número de serie" },
                        { name: "numeroLinea", label: "Número de Línea", type: "text", placeholder: "Ingrese el número de línea" },
                    ],
                    fetchData: async (id) => {
                        if (id > 0) {
                            const celular = await Api.getCelular(id);
                            console.log(celular);
                            return {
                                marca: { value: celular.modelo.marca.id, label: celular.modelo.marca.nombre },
                                modelo: { value: celular.modelo.id, label: celular.modelo.nombre },
                                serial: celular.serial_number,
                                numeroLinea: celular.numero_linea,
                            };
                        }
                        return {};
                    },
                    fetchOptions: async () => {
                        const marcas = await Api.get("marca");
                        const modelosRaw = await Api.get("modelo");


                        const marcasFiltradas = marcas.filter(
                            marca => marca.tipos.some(
                                tipo => tipo.id === TIPOS_RECURSO.CELULAR
                            )
                        );

                        const modelosFiltrados = modelosRaw.filter(
                            modelo => modelo.tipo.id === TIPOS_RECURSO.CELULAR
                        );

                        return {
                            marcas: marcasFiltradas.map((marca) => ({ value: marca.id, label: marca.nombre })),
                            modelos: modelosFiltrados.map((modelo) => ({ value: modelo.id, label: modelo.nombre, marca: modelo.marca })),
                        };
                    },
                    onSubmit: async (formData) => {
                        const payload = {
                            id_celular: _idModificar > 0 ? _idModificar : null,
                            id_modelo: formData.modelo.value,
                            serial_number: formData.serial,
                            numero_linea: formData.numeroLinea,
                        };
                        await Api.guardarCelular(payload);
                        cerrarModal();
                    },
                };

            case 'CPU':
                return {
                    title: _idModificar > 0 ? "Editar Computadora" : "Agregar Computadora",
                    subtitle: "Computadora",
                    fields: [
                        { name: "marca", label: "Marca", type: "select", optionsKey: "marcas", placeholder: "Seleccionar Marca" },
                        { name: "modelo", label: "Modelo", type: "select", optionsKey: "modelos", placeholder: "Seleccionar Modelo" },
                        { name: "nombre", label: "Nombre del equipo", type: "text", placeholder: "Ingrese el nombre del equipo" },
                        { name: "tag", label: "Tag del equipo", type: "text", placeholder: "Ingrese el tag del equipo" },
                        { name: "serial", label: "Serial", type: "text", placeholder: "Ingrese el número de serie" },
                        { name: "ip", label: "IP", type: "text", placeholder: "Ingrese la dirección IP" },
                        { name: "gw", label: "GW del equipo", type: "text", placeholder: "Ingrese el Gateway" },
                        { name: "sm", label: "SM del equipo", type: "text", placeholder: "Ingrese la Subnet Mask" },
                    ],
                    fetchData: async (id) => {
                        if (id > 0) {
                            const computadora = await Api.getComputadora(id);
                            return {
                                marca: { value: computadora.modelo.marca.id, label: computadora.modelo.marca.nombre },
                                modelo: { value: computadora.modelo.id, label: computadora.modelo.nombre },
                                nombre: computadora.nombre,
                                tag: computadora.tag,
                                serial: computadora.serial_number,
                                ip: computadora.ip,
                                gw: computadora.gw,
                                sm: computadora.sm,
                            };
                        }
                        return {};
                    },
                    fetchOptions: async () => {
                        const marcas = await Api.get("marca");
                        const modelosRaw = await Api.get("modelo");

                        const marcasFiltradas = marcas.filter(
                            marca => marca.tipos.some(
                                tipo => tipo.id === TIPOS_RECURSO.CPU
                            )
                        );

                        const modelosFiltrados = modelosRaw.filter(
                            modelo => modelo.tipo.id === TIPOS_RECURSO.CPU
                        );

                        return {
                            marcas: marcasFiltradas.map((marca) => ({ value: marca.id, label: marca.nombre })),
                            modelos: modelosFiltrados.map((modelo) => ({ value: modelo.id, label: modelo.nombre, marca: modelo.marca })),
                        };
                    },
                    onSubmit: async (formData) => {
                        const payload = {
                            id_cpu: _idModificar > 0 ? _idModificar : null,
                            id_modelo: formData.modelo.value,
                            nombre: formData.nombre,
                            tag: formData.tag ? parseInt(formData.tag, 10) : null,
                            serial_number: formData.serial,
                            ip: formData.ip,
                            gw: formData.gw,
                            sm: formData.sm
                        };
                        await Api.guardarComputadora(payload);
                        cerrarModal();
                    },
                };

            case 'LICENCIA':
                return {
                    title: _idModificar > 0 ? "Editar Licencia" : "Agregar Licencia",
                    subtitle: "Licencia",
                    fields: [
                        { name: "nombre", label: "Nombre de la licencia", type: "text", placeholder: "Ingrese el nombre de la licencia" },
                        { name: "fecha_desde", label: "Fecha Desde", type: "date" },
                        { name: "fecha_hasta", label: "Fecha Hasta", type: "date" },
                    ],
                    fetchData: async (id) => {
                        if (id > 0) {
                            const licencia = await Api.getLicencia(id);
                            return {
                                nombre: licencia.nombre,
                                fecha_desde: licencia.fecha_desde?.split("T")[0],
                                fecha_hasta: licencia.fecha_hasta?.split("T")[0]
                            };
                        }
                        return {};
                    },
                    fetchOptions: async () => {
                        return;
                    },
                    onSubmit: async (formData) => {
                        const payload = {
                            id_licencia: _idModificar > 0 ? _idModificar : null,
                            nombre: formData.nombre,
                            fecha_desde: formData.fecha_desde + "T00:00:00",
                            fecha_hasta: formData.fecha_hasta + "T00:00:00"
                        };
                        await Api.guardarLicencia(payload);
                        cerrarModal();
                    },
                }

            default:
                return null;
        }
    }

    const modalProps = getModalProps();
    if (!_celulares || !_monitores || !_computadoras || !_licencias) return (
        <div className="d-flex justify-content-center mt-5 text-primary">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    async function leerRecursos() {
        await Api.get('computadora').then((computadoras) => {
            setComputadoras(computadoras);
        });
        await Api.get('monitor').then((monitores) => {
            setMonitores(monitores);
        });
        await Api.get('celular').then((celulares) => {
            setCelulares(celulares);
        });
        await Api.get('licencia').then((licencias) => {
            setLicencias(licencias);
        })
    }

    async function altaRecurso(id, motivo) {
        try {
            await Api.altaRecurso(id, motivo);
            await leerRecursos();
            alert('Recurso dado de alta correctamente');
        } catch (error) {
            console.error(error);
            alert('No se pudo dar de alta el recurso');
        }
    }

    const listaComputadoras = Computadoras.mapearCompus(_computadoras);
    const listaCelulares = Computadoras.mapearCelulares(_celulares);
    const listaMonitores = Computadoras.mapearMonitores(_monitores);
    const listaLicencias = Computadoras.mapearLicencias(_licencias);

    let recursos = [];
    recursos = recursos.concat(listaCelulares).concat(listaComputadoras).concat(listaMonitores).concat(listaLicencias);

    for (let recurso of recursos) {
        let nombres = "";
        let motivo = "";
        for (let asignacion of recurso.asignaciones) {
            if (asignacion.fecha_baja === null) {
                nombres = nombres + asignacion.asignado_a.nombre + "; ";
            }
        }
        for (let log of recurso.logs) {
            if(log.tipoEvento === "BAJA") {
                motivo = log.motivo
            }
        }
        recurso.asignaciones = null;
        recurso.logs = null;
        nombres = nombres.slice(0, -2);
        recurso.asignado_a = nombres;
        recurso.motivo = motivo;
    }

    function mostrarMod(event, id, tipo) {
        event.preventDefault();
        setIdModificar(id);
        setTipoModificar({ label: tipo });
        setTituloModal("Modificar recurso");
        setIsModalOpen(true);
    }

    function abrirModalAsignaciones(e, id) {
        e.preventDefault();
        setIdAsignacion(id);
    }

    function abrirModalLogs(e, id) {
        e.preventDefault();
        setIdModificar(id);
    }

    // --------------------- TOAST -----------------------
    function mostrarToast(id, tipo) {
        setIdModificar(id);
        setTipoModificar(tipo);
        var toastLiveExample = document.getElementById('toastPrueba');
        var toast = new Toast(toastLiveExample);
        toast.show();
    }
    const texto = "Ingrese el motivo del alta del recurso."
    const aceptar = (motivo) => {
        //eliminarRecurso(_tipoModificar, _idModificar);
        //bajaRecurso(_idModificar);
        altaRecurso(_idModificar, motivo);
        console.log('aceptar');
        setIdModificar(-1);
        setTipoModificar(null);
    }
    const rechazar = () => {
        setIdModificar(-1);
        setTipoModificar(null);
        console.log('rechazar');
    }

    // ------------------- FIN TOAST ---------------------

    // ---------------------------TABLA!---------------------------------------

    //-------------------EXPORT CSV-----------------
    function convertArrayOfObjectsToCSV(array) {
        let result;

        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(recursos[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];

                ctr++;
            });
            result += lineDelimiter;
        });
        return result;
    }
    //Copypaste
    function downloadCSV(array) {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        const filename = 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }
    const Export = ({ onExport }) => <button className="btn btn-success" onClick={e => onExport(e.target.value)}>Exportar CSV</button>;
    const actions = <Export onExport={() => downloadCSV(filteredItems)} />;
    //-----------------FIN EXPORT CSV----------------

    //-------------------FILTRADO-------------------------
    const filteredItems = recursos.filter((recurso) => (
        (recurso.fecha_baja !== null && (_tipoFiltro.label === 'TODOS' || recurso.tipo === _tipoFiltro.label) && (recurso.modelo + recurso.marca + recurso.asignado_a + recurso.ip + recurso.gw + recurso.sm + recurso.id + recurso.nombre + recurso.id).toLowerCase().includes(_filtrar.toLowerCase()))
    ));


    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };
    //-----------------FIN FILTRADO-----------------------

    const customStyles = {
        cells: {
            style: {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: defaultThemes.default.divider.default,
                paddingRight: '0px',
                paddingLeft: '0px',
                marginLeft: '0px',
                fontSize: '0.7rem'
            }
        }
    }

    function listarNombres(a) {
        if (!a) return <p>No asignado</p>
        let lista = a.split('; ');
        return (
            <div className="text-left">
                <ul className="list-group">
                    {lista.map((el) => (
                        <li key={el}>{el}</li>
                    ))}
                </ul>
            </div>
        )
    }
    const columnasTodos = [
        {
            name: 'ID',
            selector: row => row.id,
            width: '60px'
        },
        {
            name: 'TIPO',
            selector: row => row.tipo,
            width: '100px',
            sortable: true
        },
        {
            name: 'NOMBRE',
            selector: row => row.nombre
        },
        {
            name: 'TAG',
            selector: row => row.tag,
            width: '85px'
        },
        {
            name: 'SERIAL NUMBER',
            selector: row => row.serial_number,
            grow: 1
        },
        {
            name: 'MARCA',
            selector: row => row.marca,
            sortable: true
        },
        {
            name: 'MODELO',
            selector: row => row.modelo
        },
        
        {
            name: 'DIRECCIONES DE RED',
            cell: row => (
                <div className="ps-3">
                    <div className="row mt-1">
                        IP: {row.ip}
                    </div>
                    <div className="row my-1">
                        GW: {row.gw}
                    </div>
                    <div className="row mb-1">
                        SM: {row.sm}
                    </div>

                </div>
            )
        },
        {
            name: 'TELEFONO',
            selector: row => row.numero_telefono
        },
        {
            name: 'MOTIVO BAJA',
            selector: row => row.motivo
        },
        {
            name: 'HISTORIAL DE ASIGNACIONES',
            cell: row => (
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center">
                        <div className="col-4">
                            <Can permisos={["RECURSO_HISTORIAL"]}>
                                <button className="btn acciones" data-bs-toggle="modal" data-bs-target="#historialModal" onClick={(e) => abrirModalAsignaciones(e, row.id)} data-tip="Historial">
                                    <span className="bi-clock-history"></span>
                                </button>
                            </Can>
                        </div>
                    </div>
                </div>
            ),
            center: true
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => (
                <Fragment>
                    <Can permisos={["RECURSO_HISTORIAL"]}>
                        <button className="btn acciones" data-bs-toggle="modal" data-bs-target="#logsModal" onClick={(e) => abrirModalLogs(e, row.id)} data-tip="Historial">
                            <span className="bi-clock-history"></span>
                        </button>
                    </Can>
                    <Can permisos={["RECURSO_ELIMINAR"]}>
                        <button onClick={() => mostrarToast(row.id, row.tipo)} className="btn btn-primary acciones" data-tip="Alta recurso"><span className="bi-arrow-90deg-up d-flex justify-content-center"></span></button>
                    </Can>
                </Fragment>
            )
        }
    ]

    const columnasAcciones = [
        {
            name: 'HISTORIAL DE ASIGNACIONES',
            cell: row => (
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center">
                        <div className="col-4">
                            <Can permisos={["RECURSO_HISTORIAL"]}>
                                <button className="btn acciones" data-bs-toggle="modal" data-bs-target="#historialModal" onClick={(e) => abrirModalAsignaciones(e, row.id)} data-tip="Historial">
                                    <span className="bi-clock-history"></span>
                                </button>
                            </Can>
                        </div>
                    </div>
                </div>
            ),
            center: true
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => (
                <Fragment>
                    <Can permisos={["RECURSO_HISTORIAL"]}>
                        <button className="btn acciones" data-bs-toggle="modal" data-bs-target="#logsModal" onClick={(e) => abrirModalLogs(e, row.id)} data-tip="Historial">
                            <span className="bi-clock-history"></span>
                        </button>
                    </Can>
                    <Can permisos={["RECURSO_ELIMINAR"]}>
                        <button onClick={() => mostrarToast(row.id, row.tipo)} className="btn btn-primary acciones" data-tip="Alta recurso"><span className="bi-arrow-90deg-up d-flex justify-content-center"></span></button>
                    </Can>
                </Fragment>
            )
        }
    ]

    const columnasComunes = [
        {
            name: 'ID',
            selector: row => row.id,
            width: '60px'
        },
        {
            name: 'TIPO',
            selector: row => row.tipo,
            width: '100px',
            sortable: true
        }
    ]

    const columnasCPU = [
        ...columnasComunes,
        {
            name: 'NOMBRE',
            selector: row => row.nombre
        },
        {
            name: 'TAG',
            selector: row => row.tag,
            width: '85px'
        },
        {
            name: 'SERIAL NUMBER',
            selector: row => row.serial_number,
            grow: 1
        },
        {
            name: 'MARCA',
            selector: row => row.marca,
            sortable: true
        },
        {
            name: 'MODELO',
            selector: row => row.modelo
        },
        {
            name: 'DIRECCIONES DE RED',
            cell: row => (
                <div className="ps-3">
                    <div className="row mt-1">
                        IP: {row.ip}
                    </div>
                    <div className="row my-1">
                        GW: {row.gw}
                    </div>
                    <div className="row mb-1">
                        SM: {row.sm}
                    </div>

                </div>
            )
        },
        ...columnasAcciones
    ]
    const columnasMonitor = [
        ...columnasComunes,
        {
            name: 'NOMBRE',
            selector: row => row.nombre
        },
        {
            name: 'TAG',
            selector: row => row.tag,
            width: '85px'
        },
        {
            name: 'SERIAL NUMBER',
            selector: row => row.serial_number,
            grow: 1
        },
        {
            name: 'MARCA',
            selector: row => row.marca,
            sortable: true
        },
        {
            name: 'MODELO',
            selector: row => row.modelo
        },
        ...columnasAcciones
    ]
    const columnasCelular = [
        ...columnasComunes,
        {
            name: 'SERIAL NUMBER',
            selector: row => row.serial_number,
            grow: 1
        },
        {
            name: 'MARCA',
            selector: row => row.marca,
            sortable: true
        },
        {
            name: 'MODELO',
            selector: row => row.modelo
        },
        {
            name: 'TELEFONO',
            selector: row => row.numero_telefono
        },
        ...columnasAcciones
    ]
    const columnasLicencia = [
        ...columnasComunes,
        {
            name: 'NOMBRE',
            selector: row => row.nombre
        },
        {
            name: 'FECHA DESDE',
            selector: row => row.serial_number
        },
        {
            name: 'FECHA HASTA',
            selector: row => row.marca
        },
        ...columnasAcciones
    ]


    function getColumns(tipo) {
        switch (tipo?.label) {
            case "CPU":
                return columnasCPU;

            case "MONITOR":
                return columnasMonitor;

            case "CELULAR":
                return columnasCelular;

            case "LICENCIA":
                return columnasLicencia;

            default:
                return columnasTodos;
        }
    }
    //-------------------------FIN TABLAS!-----------------------------

    function modificarSeleccionado(e) {
        setTipoModificar({ value: e.value, label: e.label });
    }

    return (
        <div className='container-fluid mt-3'>

            <div className="justify-content-center d-flex">
                <h1 className="text-center my-2">Recursos dados de baja</h1>
            </div>
            {isModalOpen && modalProps ? (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h5 className="modal-title">{modalProps.title}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => cerrarModal()}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <Modal
                                    title={modalProps.subtitle}
                                    fields={modalProps.fields}
                                    id={_idModificar}
                                    fetchData={modalProps.fetchData}
                                    fetchOptions={modalProps.fetchOptions}
                                    onSubmit={modalProps.onSubmit}
                                    onClose={cerrarModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="sticky-top justify-content-center d-flex">
                <ConfirmarEliminado aidi="toastPrueba" rechazar={rechazar} aceptar={aceptar} texto={texto}></ConfirmarEliminado>
            </div>
            <div className='row'>
                <label className='d-flex'>Filtros:</label>
                <Select
                    className='col-2'
                    options={[
                        { value: null, label: "TODOS" },
                        ...tipos
                    ]}
                    value={_tipoFiltro}
                    onChange={setTipoFiltro}
                />
                <input className='col-2' value={_filtrar} onChange={(e) => setFiltrar(e.target.value)} placeholder="Filtrar" />
            </div>

            <div >
                <ReactTooltip delayShow={600} />
                <DataTable
                    columns={getColumns(_tipoFiltro)}
                    data={filteredItems}
                    customStyles={customStyles}
                    pagination
                    striped={true}
                    paginationComponentOptions={paginationComponentOptions}
                    actions={actions}
                />
            </div>

            <div>
                <div className="modal fade bd-example-modal" id="asignacionModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="asignacionModalLabel">Asignaciones</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => cerrarModal()}></button>
                            </div>
                            <div className="modal-body">
                                <CartelAsignacion id={_idAsignacion} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="modal fade bd-example-modal" id="historialModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="asignacionModalLabel">Historial de asignaciones</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => cerrarModal()}></button>
                            </div>
                            <div className="modal-body">
                                <ModalHistorial id={_idAsignacion} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="modal fade bd-example-modal" id="logsModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="logsModalLabel">Historial del recurso</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => cerrarModal()}></button>
                            </div>
                            <div className="modal-body">
                                <ModalLogs id={_idModificar} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

