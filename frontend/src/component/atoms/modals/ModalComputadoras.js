import React, { useState, useEffect, Fragment } from "react";
import Select from "react-select";
import { Api } from "../../../services/ApiService";
import AtomTextFiel from "../inputs/AtomTextFiel";
import Can from "../../Can";

export default function ModalComputadoras(props) {

    const [marcas, setMarcas] = useState(null);
    const [modelos, setModelos] = useState([]);
    const [modelosFiltrados, setModelosFiltrados] = useState(null);

    const idComputadora = props.id;
    const [fecha_crea, setFechaCrea] = useState(null);
    const [idRecurso, setIdRecurso] = useState(null);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
    const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
    const [nombreInput, setNombreInput] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [serialInput, setSerialInput] = useState("");
    const [ipInput, setIpInput] = useState("");
    const [gwInput, setGwInput] = useState("");
    const [smInput, setSmInput] = useState("");

    useEffect(() => {
        leerMarcas();
        leerModelos();
    }, []);

    useEffect(() => {
        leerComputadora(idComputadora);
    }, [idComputadora]);

    useEffect(() => {
        if (marcaSeleccionada != null) {
            setModelosFiltrados(modelos
                .filter((modelo) => (modelo.marca.id === marcaSeleccionada.value))
                .map((modelo) => ({ value: modelo.id, label: modelo.nombre })));
        }
    }, [marcaSeleccionada])

    function leerComputadora(id) {
        if (id > 0) {
            Api.getComputadora(id).then((computadora) => {
                setIdRecurso(computadora.recurso.id_recurso);
                setNombreInput(computadora.nombre);
                setTagInput(computadora.tag);
                setGwInput(computadora.gw);
                setIpInput(computadora.ip);
                setSmInput(computadora.sm);
                setSerialInput(computadora.serial_number);
                setMarcaSeleccionada({ value: computadora.modelo.marca.id, label: computadora.modelo.marca.nombre });
                setModeloSeleccionado({ value: computadora.modelo.id, label: computadora.modelo.nombre });
                setFechaCrea(computadora.recurso.fecha_creacion);
            })
        } else {
            setIdRecurso(null);
            limpiarPantalla();
        }
    }

    function leerMarcas() {
        Api.get('marca').then((marcas) => {
            setMarcas(marcas.map((marca) => ({ value: marca.id, label: marca.nombre })));
        });
    }

    function leerModelos() {
        Api.get('modelo').then((modelos) => {
            setModelos(modelos);
        });
    }

    const guardarComputadora = async (e) => {
        e.preventDefault();

        const payload = {
            id_cpu: idComputadora > 0 ? idComputadora : null,
            nombre: nombreInput,
            tag: tagInput,
            serial_number: serialInput,
            ip: ipInput,
            sm: smInput,
            gw: gwInput,
            id_modelo: modeloSeleccionado.value
        };

        try {
            await Api.guardarComputadora(payload);
            alert("Computadora guardada correctamente");
            limpiarPantalla();
        } catch (error) {
            alert("Error al guardar la computadora");
            console.error(error);
        }
    }

    function limpiarPantalla() {
        setNombreInput("");
        setTagInput("");
        setSerialInput("");
        setIpInput("");
        setGwInput("");
        setSmInput("");
        setModeloSeleccionado(null);
    }

    function modificarMarcaSeleccionada(e) {
        setMarcaSeleccionada({ value: e.value, label: e.label });
        setModeloSeleccionado(null);
    }

    function modificarModeloSeleccionado(e) {
        setModeloSeleccionado({ value: e.value, label: e.label });
    }

    return (
        <Fragment>
            <div className="container">
                <h5 className="text-center">Computadora</h5>
                <div className="card-body rounded border border-2">
                    <form onSubmit={(e) => guardarComputadora(e)}>
                        <div className="row d-flex justify-content-center">
                            <div className="col-6 mb-2">
                                <label>Marca</label>
                                <Select
                                    options={marcas}
                                    value={marcaSeleccionada}
                                    placeholder="Seleccionar Marca"
                                    onChange={(e) => modificarMarcaSeleccionada(e)}
                                />
                            </div>

                            <div className="col-6 mb-2">
                                <label>Modelo</label>
                                <Select
                                    options={modelosFiltrados}
                                    value={modeloSeleccionado}
                                    placeholder="Seleccionar Modelo"
                                    onChange={(e) => modificarModeloSeleccionado(e)}
                                />
                            </div>
                        </div>
                        <div className="row d-flex justify-content-around">
                            <div className="col-4 mb-2">
                                <AtomTextFiel 
                                    label="Nombre del equipo" 
                                    placeholder="Nombre del equipo" 
                                    value={nombreInput} 
                                    onChange={(e) => setNombreInput(e.target.value)} 
                                />
                            </div>

                            <div className="col-4 mb-2">
                                <AtomTextFiel 
                                    label="Tag del equipo" 
                                    placeholder="Tag del equipo" 
                                    value={tagInput} 
                                    onChange={(e) => setTagInput(e.target.value)} 
                                />
                            </div>
                            <div className="col-4 mb-2">
                                <AtomTextFiel 
                                    label="Serial Number" 
                                    placeholder="Serial Number" 
                                    value={serialInput} 
                                    onChange={(e) => setSerialInput(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div className="row d-flex justify-content-around">
                            <div className="col-4 mb-2">
                                <AtomTextFiel 
                                    label="IP del equipo" 
                                    placeholder="IP del equipo" 
                                    value={ipInput} 
                                    onChange={(e) => setIpInput(e.target.value)} 
                                />                            
                            </div>
                            <div className="col-4 mb-2">
                                <AtomTextFiel 
                                    label="SM del equipo" 
                                    placeholder="SM del equipo" 
                                    value={smInput} 
                                    onChange={(e) => setSmInput(e.target.value)} 
                                />
                            </div>
                            <div className="col-4 mb-2">
                                <AtomTextFiel 
                                    label="GW del equipo" 
                                    placeholder="GW del equipo" 
                                    value={gwInput} 
                                    onChange={(e) => setGwInput(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div className="row d-flex justify-content-end">
                            <div className="col-3">
                                <CanRecurso permisos={["RECURSO_CREAR", "RECURSO_EDITAR"]} tipo={"CPU"}>
                                    <button type="submit" className="btn btn-success ms-5">Guardar</button>
                                </CanRecurso>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )

}