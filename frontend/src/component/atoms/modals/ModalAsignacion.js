import React, { useState, useEffect } from "react";
import Select from "react-select";
import Recurso from "../../../models/Recurso";
import { Api } from "../../../services/ApiService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Can from "../../Can.jsx"

export default function CartelAsignacion(props) {
    const _idRecurso = props.id;

    const [_todasLasRegiones, setTodasLasRegiones] = useState([]);
    const [_todasLasLocalidades, setTodasLasLocalidades] = useState([]);
    const [_todosLosCelos, setTodosLosCelos] = useState([]);
    const [_todosLosCecos, setTodosLosCecos] = useState([]);
    const [_todasLasPersonas, setTodasLasPersonas] = useState([]);

    const [_regionSeleccionada, setRegionSeleccionada] = useState(null);
    const [_localidadSeleccionada, setLocalidadSeleccionada] = useState(null);
    const [_celoSeleccionado, setCeloSeleccionado] = useState(null);
    const [_cecoSeleccionado, setCecoSeleccionado] = useState(null);
    const [_personaSeleccionada, setPersonaSeleccionada] = useState(null);

    const [startDate, setStartDate] = useState(new Date());

    let recursoProps;
    useEffect(() => {

        leerRecurso(_idRecurso);

        Api.get('persona').then((personas) => {
            setTodasLasPersonas(personas);
        });

        Api.get('region').then((regiones) => {
            setTodasLasRegiones(regiones);
        });

        Api.get('localidad').then((localidades) => {
            setTodasLasLocalidades(localidades);
        });

        Api.get('sector').then((cecos) => {
            setTodosLosCecos(cecos);
        });

        Api.get('celo').then((celos) => {
            setTodosLosCelos(celos);
        });
    }, [_idRecurso]);

    function leerRecurso(id) {
        Api.getRecurso(id).then((recurso) => {
            recursoProps = new Recurso(recurso);
            if (recurso === null) {
                limpiarSelects();
            }
        })
    }

    function limpiarSelects() {
        setPersonaSeleccionada(null);
        setCecoSeleccionado(null);
        setCeloSeleccionado(null);
        setLocalidadSeleccionada(null);
        setRegionSeleccionada(null);
        setStartDate(new Date());
    }

    var _opcionesSelectRegion = _todasLasRegiones.map((region) =>
        ({ value: region.id, label: 'Region ' + region.id })
    );
    var _opcionesSelectLocalidad;
    if (_regionSeleccionada !== null) {
        _opcionesSelectLocalidad = _todasLasLocalidades
            .filter((localidad) => ((localidad.region.id === _regionSeleccionada.value)))
            .map((localidad) => ({ value: localidad.id, label: localidad.localidad }));
    }
    let _opcionesSelectCeco;
    if (_regionSeleccionada !== null) {
        _opcionesSelectCeco = _todosLosCecos
            .filter((ceco) => ((ceco.region.id === _regionSeleccionada.value)))
            .map((ceco) => ({ value: ceco.id, label: ceco.descripcion }));
    }

    let _opcionesSelectCelo;
    if (_localidadSeleccionada !== null) {
        _opcionesSelectCelo = _todosLosCelos
            .filter((celo) => ((celo.localidad.id === _localidadSeleccionada.value)))
            .map((celo) => ({ value: celo.id_celo, label: celo.nombre }));
    }

    var _opcionesSelectPersona = _todasLasPersonas.map((persona) =>
        ({ value: persona.login, label: persona.nombre })
    );

    function modificarPersonaSeleccionada(event) {
        setPersonaSeleccionada({ value: event.value, label: event.label });
    }
    function modificarRegionSeleccionada(event) {
        setRegionSeleccionada({ value: event.value, label: event.label });
        setLocalidadSeleccionada(null);
        setCecoSeleccionado(null);
        setCeloSeleccionado(null);
    }
    function modificarLocalidadSeleccionada(event) {
        setLocalidadSeleccionada({ value: event.value, label: event.label });
        setCeloSeleccionado(null);
    }
    function modificarCecoSeleccionado(event) {
        setCecoSeleccionado({ value: event.value, label: event.label });
    }
    function modificarCeloSeleccionado(event) {
        setCeloSeleccionado({ value: event.value, label: event.label });
    }

    function toLocalDateString(date) {
        return date.toISOString();
    }

    const guardarAsignacion = async (e) => {
        e.preventDefault();

        const payload = {
            id_recurso: _idRecurso,
            login_asignado_a: _personaSeleccionada.value,
            id_ceco: _cecoSeleccionado.value,
            id_celo: _celoSeleccionado.value,
            fecha_alta: startDate ? toLocalDateString(startDate) : null
        };

        try {
            await Api.asignarRecurso(payload);
            alert("Recurso asignado correctamente");
            limpiarSelects();
        } catch (error) {
            alert("Error al asignar recurso");
            console.error(error);
        }
    };

    const estiloSelect = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '30px',
            height: '30px'
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: '30px',
            fontSize: '14px',
            padding: '0px 6px'
        }),
        option: (provided, state) => ({
            ...provided,
            height: '30px',
            padding: '1px 0px',
            fontSize: '14px'

        })

    }

    return (
        <div>
            <div className="container">
                <div className="card mt-4">
                    <div className="card-body rounded border border-2">
                        <form onSubmit={(e) => guardarAsignacion(e)}>

                            <div className="row justify-content-center mb-1">
                                <div className="col-5 mb-2">
                                    <label className="ms-2">Persona:</label>
                                    <Select
                                        styles={estiloSelect}
                                        placeholder="Seleccionar persona"
                                        value={_personaSeleccionada}
                                        onChange={(e) => modificarPersonaSeleccionada(e)}
                                        options={_opcionesSelectPersona}
                                        className="mb-2"
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-center mb-1">
                                <div className="col-4 mb-2">
                                    <label className="ms-2">Región:</label>
                                    <Select
                                        styles={estiloSelect}
                                        placeholder="Seleccionar Region"
                                        value={_regionSeleccionada}
                                        onChange={(e) => modificarRegionSeleccionada(e)}
                                        options={_opcionesSelectRegion}
                                        className="mb-2"
                                    />
                                </div>

                                <div className="col-4 mb-2">
                                    <label className="ms-2">Sector:</label>
                                    <Select
                                        styles={estiloSelect}
                                        placeholder="Seleccionar sector"
                                        value={_cecoSeleccionado}
                                        onChange={(e) => modificarCecoSeleccionado(e)}
                                        options={_opcionesSelectCeco}
                                        className="mb-2"
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-center mb-1">
                                <div className="col-4 mb-2">
                                    <label className="ms-2">Localidad:</label>
                                    <Select
                                        styles={estiloSelect}
                                        placeholder="Seleccionar localidad"
                                        value={_localidadSeleccionada}
                                        onChange={(e) => modificarLocalidadSeleccionada(e)}
                                        options={_opcionesSelectLocalidad}
                                        className="mb-2"
                                    />
                                </div>
                                <div className="col-4 mb-2">
                                    <label className="ms-2">Lugar de trabajo:</label>
                                    <Select
                                        styles={estiloSelect}
                                        placeholder="Seleccionar lugar"
                                        value={_celoSeleccionado}
                                        onChange={(e) => modificarCeloSeleccionado(e)}
                                        options={_opcionesSelectCelo}
                                        className="mb-2"
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-center mb-1">
                                <div className="col-3 mb-2">
                                    <label className="ms-2">Fecha de asignación:</label>
                                    <DatePicker
                                        selected={startDate} onChange={(date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                            </div>

                            <div className="mt-3 d-flex justify-content-end">
                                <div className="col-3 d-flex justify-content-end">
                                    <Can permisos={["RECURSO_ASIGNAR"]}>
                                        <button type="submit" className="btn btn-success ms-5">Asignar</button>
                                    </Can>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}