import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import Select from "react-select";
import { Api } from "../../../services/ApiService";
import AtomTextFiel from "../inputs/AtomTextFiel";
import Can from "../../Can";

export default function ModalCelulares(props) {

    const [marcas, setMarcas] = useState(null);
    const [modelos, setModelos] = useState([]);

    const idCelular = props.id;
    const [idRecurso, setIdRecurso] = useState(null);
    const [serialInput, setSerialInput] = useState('');
    const [numeroLineaInput, setNumeroLineaInput] = useState('');

    const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
    const [modeloSeleccionado, setModeloSeleccionado] = useState(null);

    const [modelosFiltrados, setModelosFiltrados] = useState(null);


    useEffect(() => {
        leerMarcas();
        leerModelos();
    }, []);

    useEffect(() => {
        leerCelular(idCelular);
    }, [idCelular]);

    useEffect(() => {
        if (marcaSeleccionada != null) {
            setModelosFiltrados(modelos
                .filter((modelo) => (modelo.marca.id === marcaSeleccionada.value))
                .map((modelo) => ({ value: modelo.id, label: modelo.nombre })))
        }
    }, [marcaSeleccionada])

    function leerCelular(id) {
        console.log(id);
        if (id > 0) {
            Api.getCelular(id).then((celular) => {
                setIdRecurso(celular.recurso.id_recurso);
                setSerialInput(celular.serial_number);
                setMarcaSeleccionada({ value: celular.modelo.marca.id, label: celular.modelo.marca.nombre });
                setModeloSeleccionado({ value: celular.modelo.id, label: celular.modelo.nombre });
                setNumeroLineaInput(celular.numero_linea);
            })
        } else {
            setIdRecurso(null);
            limpiarPantalla();
        }
    }

    function leerMarcas() {
        Api.get('marca').then((marcas) => {
            setMarcas(marcas
                .map((marca) => ({ value: marca.id, label: marca.nombre }))
            );
        });
    }
    function leerModelos() {
        Api.get('modelo').then((modelos) => {
            setModelos(modelos);
        });
    }

    const guardarCelular = async (e) => {
        e.preventDefault();

        const payload = {
            id_celular: idCelular > 0 ? idCelular : null,
            serial_number: serialInput,
            id_modelo: modeloSeleccionado.value,
            numero_linea: numeroLineaInput
        };

        try {
            await Api.guardarCelular(payload);
            alert("Celular guardado correctamente");
            limpiarPantalla();
        } catch (error) {
            alert("Error al guardar el celular");
            console.error(error);
        }
    };

    function limpiarPantalla() {
        setNumeroLineaInput('');
        setSerialInput('');
        setMarcaSeleccionada(null);
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
                <h5 className="text-center">Celular</h5>
                <div className="card-body rounded border border-2">
                    <form onSubmit={(e) => guardarCelular(e)}>
                        <div className="row d-flex justify-content-center mb-2">
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
                            <div className="col-6">
                                <AtomTextFiel 
                                    label="Teléfono" 
                                    placeholder="Número de linea" 
                                    value={numeroLineaInput} 
                                    onChange={(e) => setNumeroLineaInput(e.target.value)} 
                                />
                            </div>

                            <div className="col-6">
                                <AtomTextFiel 
                                    label="Serial" 
                                    placeholder="Serial" 
                                    value={serialInput} 
                                    onChange={(e) => setSerialInput(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end ml-auto">
                            <CanRecurso permisos={["RECURSO_CREAR", "RECURSO_EDITAR"]} tipo={"CELULAR"}>
                                <button type="submit" className="btn btn-success">Guardar PORONGAAAAAA</button>
                            </CanRecurso>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}