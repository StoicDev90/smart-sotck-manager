
import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../assets/styles/CargarEquipo.css"
import { Api } from "../services/ApiService";
import NombreEquipoInput from "../component/atoms/NombreEquipoInput";
import TagInput from "../component/atoms/TagInput";

export default function CargarEquipo(props) {

    const _idModificar = props.id;
    const _tipoModificar = props.tipo;
    const [_nombreInput, setNombreInput] = useState('');
    const [_tagInput, setTagInput] = useState('');
    const [_serialInput, setSerialInput] = useState('');
    const [_ipInput, setIpInput] = useState('');
    const [_gwInput, setGwInput] = useState('');
    const [_smInput, setSmInput] = useState('');
    const [_numeroLineaInput, setNumeroLineaInput] = useState('');
    const [_idRecurso, setIdRecurso] = useState(null);

    const [_todasLasMarcas, setTodasLasMarcas] = useState([]);
    const [_todosLosModelos, setTodosLosModelos] = useState([]);
    const [_todosLosTipos, setTodosLosTipos] = useState([]);

    const [_marcaSeleccionada, setMarcaSeleccionada] = useState(null);
    const [_modeloSeleccionado, setModeloSeleccionado] = useState(null);
    const [_tipoSeleccionado, setTipoSeleccionado] = useState(null);

    useEffect(() => {
        leerRecurso(_idModificar, _tipoModificar);
        leerMarcas();
        leerModelos();
        leerTipos();
    }, [_idModificar]);

    //Pido a la base toda la informacion necesaria
    function leerMarcas() {
        Api.get('marca').then((marcas) => {
            setTodasLasMarcas(marcas);
        });
    }
    function leerModelos() {
        Api.get('modelo').then((modelos) => {
            setTodosLosModelos(modelos);
        })
    }
    function leerTipos() {
        Api.get('tipo').then((tipos) => {
            setTodosLosTipos(tipos);
        });
    }

    const guardarCelular = () => {
        let celular = {
            modelo: { id: _modeloSeleccionado.value },
            numero_linea: _numeroLineaInput,
            serial_number: _serialInput,
        }
        let recurso = {
            tipo: { id: _tipoSeleccionado.value },
            estado: 'A',
            fecha_creacion: Date.now(),
            ultima_actualizacion_por: { id_usuario: 1 }
        }
        if (_idModificar < 0) {
            Api.postCelular(celular, recurso)
        } else {
            let id_m = { id_celular: _idModificar }
            let id_r = { id_recurso: _idRecurso }
            Object.assign(celular, id_m);
            Object.assign(recurso, id_r);
            Api.putCelular(celular, recurso);
        }
        limpiarPantalla();
    }

    const guardarComputadora = async (accion) => {
        let confirmacion;
        let computadora = {
            nombre: _nombreInput,
            tag: _tagInput,
            serial_number: _serialInput,
            modelo: { id: _modeloSeleccionado.value },
            ip: _ipInput,
            gw: _gwInput,
            sm: _smInput
        }
        let recurso = {
            tipo: { id: _tipoSeleccionado.value },
            estado: 'A',
            fecha_creacion: Date.now(),
            ultima_actualizacion_por: { id_usuario: 1 }
        }
        if (_idModificar < 0) {
            confirmacion = await Api.postComputadora(computadora, recurso);
        } else {
            let id_m = { id_cpu: _idModificar }
            let id_r = { id_recurso: _idRecurso }
            Object.assign(computadora, id_m);
            Object.assign(recurso, id_r);
            confirmacion = await Api.putComputadora(computadora, recurso);
        }
        if (confirmacion.status === 200);
        limpiarPantalla();

    }
    const guardarMonitor = () => {
        let monitor = {
            nombre: _nombreInput,
            tag: _tagInput,
            serial_number: _serialInput,
            modelo: { id: _modeloSeleccionado.value }
        }
        let recurso = {
            tipo: { id: _tipoSeleccionado.value },
            estado: 'A',
            fecha_creacion: Date.now(),
            ultima_actualizacion_por: { id_usuario: 1 }
        }
        if (_idModificar < 0) {
            Api.postMonitor(monitor, recurso);
        } else {
            let id_m = { id_monitor: _idModificar }
            let id_r = { id_recurso: _idRecurso }
            Object.assign(monitor, id_m);
            Object.assign(recurso, id_r);
            Api.putMonitor(monitor, recurso);
        }
        limpiarPantalla();
    }

    function guardarEquipo(e) {
        e.preventDefault();
        if (_tipoSeleccionado.label === 'CELULAR') {
            guardarCelular();
        } else if (_tipoSeleccionado.label === 'CPU') {
            guardarComputadora();
        } else if (_tipoSeleccionado.label === 'MONITOR') {
            guardarMonitor();
        }
    }

    function leerRecurso(id, tipo) {
        if (id > 0) {
            if (tipo === 'CPU') {
                Api.getComputadora(id).then((computadora) => {
                    setIdRecurso(computadora.recurso.id_recurso);
                    setTipoSeleccionado({ value: computadora.recurso.tipo.id, label: computadora.recurso.tipo.nombre });
                    setNombreInput(computadora.nombre);
                    setTagInput(computadora.tag);
                    setGwInput(computadora.gw);
                    setIpInput(computadora.ip);
                    setSmInput(computadora.sm);
                    setSerialInput(computadora.serial_number);
                    setMarcaSeleccionada({ value: computadora.modelo.marca.id, label: computadora.modelo.marca.nombre });
                    setModeloSeleccionado({ value: computadora.modelo.id, label: computadora.modelo.nombre });
                })
            }
            if (tipo === 'MONITOR') {
                Api.getMonitor(id).then((monitor) => {
                    setIdRecurso(monitor.recurso.id_recurso);
                    setTipoSeleccionado({ value: monitor.recurso.tipo.id, label: monitor.recurso.tipo.nombre });
                    setNombreInput(monitor.nombre);
                    setTagInput(monitor.tag);
                    setSerialInput(monitor.serial_number);
                    setMarcaSeleccionada({ value: monitor.modelo.marca.id, label: monitor.modelo.marca.nombre });
                    setModeloSeleccionado({ value: monitor.modelo.id, label: monitor.modelo.nombre });
                })
            }
            if (tipo === 'CELULAR') {
                Api.getCelular(id).then((celular) => {
                    setIdRecurso(celular.recurso.id_recurso);
                    setTipoSeleccionado({ value: celular.recurso.tipo.id, label: celular.recurso.tipo.nombre });
                    setSerialInput(celular.serial_number);
                    setMarcaSeleccionada({ value: celular.modelo.marca.id, label: celular.modelo.marca.nombre });
                    setModeloSeleccionado({ value: celular.modelo.id, label: celular.modelo.nombre });
                    setNumeroLineaInput(celular.numero_linea);
                })
            }
        }
        else {
            setIdRecurso(null);
            limpiarPantalla();
        }
    }

    //Mapeo las marcas para que las entienda el <Select>
    var _opcionesSelectMarca = _todasLasMarcas
        .map((marca) => ({ value: marca.id, label: marca.nombre }));

    //Me traigo todos los modelos que coincidan con la marca seleccionada
    var _opcionesSelectModelo;
    if (_marcaSeleccionada !== null) {
        _opcionesSelectModelo = _todosLosModelos
            .filter((modelo) => (modelo.marca.id === _marcaSeleccionada.value))
            .map((modelo) => ({ value: modelo.id, label: modelo.nombre }));
    }

    var _opcionesSelectTipo = _todosLosTipos
        .map((tipo) => ({ value: tipo.id, label: tipo.nombre }));

    function modificarTipoSeleccionado(event) {
        setTipoSeleccionado({ value: event.value, label: event.label });
    }
    //Si se modifica la marca se reinicia el <Select> de modelo y su valor seleccionado
    function modificarMarcaSeleccionada(event) {
        setMarcaSeleccionada({ value: event.value, label: event.label });
        setModeloSeleccionado(null);
    }
    function modificarModeloSeleccionado(event) {
        setModeloSeleccionado({ value: event.value, label: event.label });
    }

    function limpiarPantalla() {
        setNombreInput('');
        setTagInput('');
        setSerialInput('');
        setMarcaSeleccionada(null);
        setModeloSeleccionado(null);
        setTipoSeleccionado(null);
        setGwInput('');
        setIpInput('');
        setSmInput('');
        setNumeroLineaInput('');
    }

    function validarIp(ip) {
        let octetos = ip.split('.');
        if (octetos.length < 4 && octetos.length > 1) {
            return false;
        }
        for (const octeto of octetos) {
            console.log(parseInt(octeto))
            if (parseInt(octeto) < 0 || parseInt(octeto) > 255) {
                return false;
            }
        }
        return true;
    }
    function validarIps() {
        return validarIp(_gwInput) && validarIp(_ipInput) && validarIp(_smInput);
    }

    return (
        <div>
            <div className="container">
                <div className="card mt-4">
                    <div className="card-body rounded border border-2">
                        <form onSubmit={(e) => guardarEquipo(e)}>

                            <div className="row d-flex justify-content-center">
                                <div className="col-6 mb-2">
                                    <Select
                                        options={_opcionesSelectTipo}
                                        value={_tipoSeleccionado}
                                        placeholder="Seleccionar tipo"
                                        onChange={(e) => modificarTipoSeleccionado(e)}
                                        className=""
                                    />
                                </div>
                            </div>

                            {(_tipoSeleccionado !== null) && (_tipoSeleccionado.value === 1 || _tipoSeleccionado.value === 3) &&
                                <div className="row justify-content-around">
                                    <div className="col-3 mb-2">
                                        <label>Nombre del equipo:</label>
                                        <NombreEquipoInput value={_nombreInput} onChange={(e) => setNombreInput(e.target.value)} className="h-100 w-100 pb-2" placeholder="Nombre del equipo"></NombreEquipoInput>
                                    </div>
                                    <div className="col-3 mb-2">
                                        <label>Tag:</label>
                                        <TagInput value={_tagInput} onChange={(e) => setTagInput(e.target.value)} className="h-100 w-100 pb-2" placeholder="Tag del equipo"></TagInput>
                                    </div>
                                </div>}

                            {_tipoSeleccionado !== null &&
                                <div className="col-4 mb-2 justify-content-center">
                                    <input className="h-100 w-100 pb-2" value={_serialInput} onChange={(e) => setSerialInput(e.target.value)} placeholder="Serial Number" />
                                </div>}

                            {(_tipoSeleccionado !== null) && (_tipoSeleccionado.value === 4 || _tipoSeleccionado.value === 1 || _tipoSeleccionado.value === 3) &&
                                <div className="row d-flex justify-content-start">
                                    <div className="col-6 mb-2">
                                        <Select
                                            options={_opcionesSelectMarca}
                                            value={_marcaSeleccionada}
                                            placeholder="Seleccionar marca"
                                            onChange={(e) => modificarMarcaSeleccionada(e)}
                                            className="mb-2"
                                        />
                                    </div>
                                    <div className="col-6 mb-2">
                                        <Select
                                            name="select-modelo"
                                            placeholder="Seleccionar modelo"
                                            value={_modeloSeleccionado}
                                            onChange={(e) => modificarModeloSeleccionado(e)}
                                            options={_opcionesSelectModelo}
                                            className="mb-2"
                                        />
                                    </div>
                                </div>}

                            {(_tipoSeleccionado !== null) && (_tipoSeleccionado.value === 1) &&
                                <div className="row justify-content-center">
                                    <div className="col-3 mb-2">
                                        <label>IP</label>
                                        <input value={_ipInput} onChange={(e) => setIpInput(e.target.value)} placeholder="IP"></input>
                                    </div>
                                    <div className="col-3 mb-2">
                                        <label>GW</label>
                                        <input value={_gwInput} onChange={(e) => setGwInput(e.target.value)} placeholder="GW"></input>
                                    </div>
                                    <div className="col-3 mb-2">
                                        <label>SM</label>
                                        <input value={_smInput} onChange={(e) => setSmInput(e.target.value)} placeholder="SM"></input>
                                    </div>
                                </div>}

                            {(_tipoSeleccionado !== null) && (_tipoSeleccionado.value === 4) &&
                                <div className="col-3 mb-2">
                                    <label>Telefono</label>
                                    <input className="h-50 w-100 pb-2" value={_numeroLineaInput} onChange={(e) => setNumeroLineaInput(e.target.value)} placeholder="Numero de linea" />
                                </div>}

                            <div className="row d-flex justify-content-end">
                                <div className="col-3 d-flex justify-content-end">
                                    <button className="btn btn-primary ms-5" onClick={() => limpiarPantalla()}>Limpiar</button>
                                    <button type="submit" className="btn btn-success ms-5">Guardar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}