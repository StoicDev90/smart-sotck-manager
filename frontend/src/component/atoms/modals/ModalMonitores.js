import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import Select from "react-select";
import { Api } from "../../../services/ApiService";
import AtomTextFiel from "../inputs/AtomTextFiel";
import Can from "../../Can";

export default function ModalMonitores(props) {

    const [marcas, setMarcas] = useState(null);
    const [modelos, setModelos] = useState(null);
    const [modelosFiltrados, setModelosFiltrados] = useState(null);


    const idMonitor = props.id;
    const [idRecurso, setIdRecurso] = useState("");
    const [nombreEquipoInput, setNombreEquipoInput] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [serialInput, setSerialInput] = useState("");
    const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
    const [modeloSeleccionado, setModeloSeleccionado] = useState(null);

    useEffect(() => {
        leerMarcas();
        leerModelos();
    }, []);

    useEffect(() => {
        leerMonitor(idMonitor);
    }, [idMonitor]);

    useEffect(() => {
        if (marcaSeleccionada != null) {
            setModelosFiltrados(modelos
                .filter((modelo) => (modelo.marca.id === marcaSeleccionada.value))
                .map((modelo) => ({ value: modelo.id, label: modelo.nombre })))
        }
    }, [marcaSeleccionada])

    const leerMonitor = (id) => {
        if (id > 0) {
            Api.getMonitor(id).then((monitor) => {
                setIdRecurso(monitor.recurso.id_recurso);
                setSerialInput(monitor.serial_number);
                setNombreEquipoInput(monitor.nombre);
                setTagInput(monitor.tag);
                setMarcaSeleccionada({ value: monitor.modelo.marca.id, label: monitor.modelo.marca.nombre });
                setModeloSeleccionado({ value: monitor.modelo.id, label: monitor.modelo.nombre });
            })
        } else {
            setIdRecurso(null);
            limpiarPantalla();
        }
    }

    const leerMarcas = () => {
        Api.get('marca').then((marcas) => {
            setMarcas(marcas
                .map((marca) => ({ value: marca.id, label: marca.nombre }))
            );
        });
    }

    const leerModelos = () => {
        Api.get('modelo').then((modelos) => {
            setModelos(modelos);
        });
    }

    const guardarMonitor = async (e) => {
        e.preventDefault();

        const payload = {
            id_monitor: idMonitor > 0 ? idMonitor : null,
            nombre: nombreEquipoInput,
            tag: tagInput,
            serial_number: serialInput,
            id_modelo: modeloSeleccionado.value
        };

        try {
            await Api.guardarMonitor(payload);
            alert("Monitor guardado correctamente");
            limpiarPantalla();
        } catch (error) {
            alert("Error al guardar el monitor");
            console.error(error);
        }

    }

    const limpiarPantalla = () => {
        setNombreEquipoInput('');
        setTagInput('');
        setSerialInput('');
        setMarcaSeleccionada(null);
        setModeloSeleccionado(null);
    }

    const modificarMarcaSeleccionada = (e) => {
        setMarcaSeleccionada({ value: e.value, label: e.label });
        setModeloSeleccionado(null);
    }

    const modificarModeloSeleccionado = (e) => {
        setModeloSeleccionado({ value: e.value, label: e.label });
    }

    return (
        <Fragment>
            <div className="container">
                <h5 className="text-center">Monitor</h5>
                <div className="card-body rounded border border-2">
                    <form onSubmit={(e) => guardarMonitor(e)}>
                        <div className="row d-flex justify-content-center mb-5">
                            <div className="col-6">
                                <label>Marca</label>
                                <Select
                                    options={marcas}
                                    value={marcaSeleccionada}
                                    placeholder="Seleccionar Marca"
                                    onChange={(e) => modificarMarcaSeleccionada(e)}
                                />
                            </div>
                            <div className="col-6">
                                <label>Modelo</label>
                                <Select
                                    options={modelosFiltrados}
                                    value={modeloSeleccionado}
                                    placeholder="Seleccionar Modelo"
                                    onChange={(e) => modificarModeloSeleccionado(e)}
                                />
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center mb-2">
                            <div className="col-4">
                                <AtomTextFiel   
                                    label="Nombre del equipo"
                                    placeholder="Nombre del equipo"
                                    value={nombreEquipoInput}
                                    onChange={(e) => setNombreEquipoInput(e.target.value)}
                                />
                            </div>
                            <div className="col-4">
                                <AtomTextFiel
                                    label="Tag del equipo"
                                    placeholder="Tag del equipo"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                />
                            </div>
                            <div className="col-4">
                                <AtomTextFiel
                                    label="Serial Number"
                                    placeholder="Serial Number"
                                    value={serialInput}
                                    onChange={(e) => setSerialInput(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end ml-auto">
                            <CanRecurso permisos={["RECURSO_EDITAR", "RECURSO_CREAR"]} tipo={"MONITOR"}>
                                <button type="submit" className="btn btn-success ms-5">Guardar</button>
                            </CanRecurso>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )

}