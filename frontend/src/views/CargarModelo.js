import React, { useState, useEffect, Fragment } from 'react';
import Select from "react-select";
import { Api } from '../services/ApiService';
import '../assets/styles/CargarModelo.css';
import DataTable from 'react-data-table-component';
import Can from '../component/Can';

export default function CargarModelo() {

    //No hace falta que sea un estado
    const [_todasLasMarcas, setTodasLasMarcas] = useState([]);
    const [_todosLosModelos, setTodosLosModelos] = useState([]);
    const [_todosLosTipos, setTodosLosTipos] = useState([]);

    const [_marcaSeleccionada, setMarcaSeleccionada] = useState("");
    const [_tipoSeleccionado, setTipoSeleccionado] = useState("");
    const [_modeloInput, setModeloInput] = useState("");
    const [_idModificar, setIdModificar] = useState(-1);

    const [_inputFiltro, setInputFiltro] = useState("");
    const [_tituloModal, setTituloModal] = useState("");

    const [opcionesTipo, setOpcionesTipo] = useState([]);

    const filtrados = _todosLosModelos.filter((modelo) => (
        (modelo.marca.nombre + ' ' + modelo.nombre).toLowerCase().includes(_inputFiltro.toLowerCase())
    ));

    //Cargo las marcas cuando se inicializa la página
    useEffect(() => {
        leerMarcas();
        leerModelos();
    }, []);

    function leerMarcas() {
        Api.get('marca').then((marcas) => {
            setTodasLasMarcas(marcas);
        })
    }

    function leerModelos() {
        Api.get('modelo').then((modelos) => {
            setTodosLosModelos(modelos);
        })
    }

    //Guardo el modelo que fue cargado
    async function guardarModelo(event) {
        event.preventDefault();
        const data = {
            marca: {
                id: _marcaSeleccionada.value
            },
            tipo: {
                id: _tipoSeleccionado.value
            },
            nombre: _modeloInput
        }
        try {
            await Api.postModelos(data);
            alert('Modelo guardado correctamente.');
        } catch (e) {
            alert('Error al guardar el modelo', e);
        }

        leerModelos();
        setModeloInput('');
        setMarcaSeleccionada(null);
        setTipoSeleccionado(null);
    }

    //Modifico el modelo seleccionado
    async function modificarModelo(event) {
        const data = {
            marca: {
                id: _marcaSeleccionada.value
            },
            tipo: {
                id: _tipoSeleccionado.value
            },
            id: _idModificar,
            nombre: _modeloInput
        }
        try {
            await Api.putModelos(data);
            alert('Modelo guardado correctamente');
        } catch (e) {
            alert('Error al editar el modelo', e);
        }

        leerModelos();
        setModeloInput('');
        setMarcaSeleccionada(null);
        setTipoSeleccionado(null);
        setIdModificar(-1);
    }

    //Elimino el modelo que fue seleccionado
    async function eliminarModelo(event, id) {
        event.preventDefault();
        await Api.deleteModelos(id);
        leerModelos();
    }

    //Mapeo las marcas dentro de un array para mostrarlas con el <Select>
    const opciones = _todasLasMarcas.map((marca) => (
        { value: marca.id, label: marca.nombre }
    ));



    //Guardo el id del modelo elegido para modificar
    async function mostrarMod(e, modelo_id, marca_id, marca_nombre, modelo_nombre, tipo_id, tipo_nombre) {
        setTituloModal("Modificar Modelo");
        setIdModificar(modelo_id);
        setMarcaSeleccionada({ value: marca_id, label: marca_nombre });
        setTipoSeleccionado({ value: tipo_id, label: tipo_nombre });
        setModeloInput(modelo_nombre);

        const marca = await Api.getMarca(marca_id);

        const tipos = marca.tipos.map(tipo => ({
            value: tipo.id,
            label: tipo.nombre
        }));
        
        setTodosLosTipos(marca.tipos);
        setOpcionesTipo(tipos);
    }
    function limpiarCampos() {
        setIdModificar(-1);
        setMarcaSeleccionada(null);
        setTipoSeleccionado(null);
        setModeloInput("");
    }

    function guardado(event) {
        if (_idModificar === -1) {
            guardarModelo(event);
        } else {
            modificarModelo(event);
        }
    }
    //Guardo en seleccionado la marca fue elegida.
    async function modificarSeleccionado(event) {
        setMarcaSeleccionada({ 
            value: event.value, 
            label: event.label 
        });

        const marca = await Api.getMarca(event.value);

        const tipos = marca.tipos.map(tipo => ({
            value: tipo.id,
            label: tipo.nombre
        }));
        
        setTodosLosTipos(marca.tipos);
        setOpcionesTipo(tipos);
        setTipoSeleccionado(null);
    }

    function modificarTipoSeleccionado(event) {
        setTipoSeleccionado({ value: event.value, label: event.label });
    }

    // --------------------------TABLA--------------------------------
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'TIPO',
            selector: row => row.tipo.nombre,
            sortable: true
        },
        {
            name: 'MARCA',
            selector: row => row.marca.nombre,
            sortable: true
        },
        {
            name: 'MODELO',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => (
                <Fragment>
                    <Can permisos={["MODELO_EDITAR"]}>
                        <button onClick={(e) => mostrarMod(e, row.id, row.marca.id, row.marca.nombre, row.nombre, row.tipo.id, row.tipo.nombre)} className="btn btn-success me-2 acciones" data-bs-toggle="modal" data-bs-target="#modificarModeloModal"><span className="bi-pencil"></span></button>
                    </Can>
                    <Can permisos={["MODELO_ELIMINAR"]}>
                        <button onClick={(e) => eliminarModelo(e, row.id)} className="btn btn-danger acciones"><span className="bi-trash"></span></button>
                    </Can>
                </Fragment>
            )
        }

    ]

    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                    <h1 className="text-center my-3">Modelos</h1>
                    <Can permisos={["MODELO_CREAR"]}>
                        <button className="boton-anadir" data-bs-toggle="modal" data-bs-target="#modificarModeloModal" onClick={() => setTituloModal('Agregar Modelo')}><span className="bi-plus"></span></button>
                    </Can>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6">
                        <input value={_inputFiltro} onChange={(e) => setInputFiltro(e.target.value)} placeholder="Filtrar" />
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-7">
                            <DataTable
                                columns={columns}
                                data={filtrados}
                                pagination
                                striped={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modificarModeloModal" tabIndex="-1" aria-labelledby="modificar modelo" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{_tituloModal}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => limpiarCampos()}></button>
                            </div>
                            <div className="modal-body">
                                <Select
                                    options={opciones}
                                    value={_marcaSeleccionada}
                                    placeholder="Seleccionar marca"
                                    onChange={(e) => modificarSeleccionado(e)}
                                    className="mb-3"
                                />
                                <Select
                                    options={opcionesTipo}
                                    value={_tipoSeleccionado}
                                    placeholder="Seleccionar tipo"
                                    onChange={(e) => modificarTipoSeleccionado(e)}
                                    className="mb-3"
                                />
                                <input className="form-control w-100 mb-3" value={_modeloInput} onChange={(e) => setModeloInput(e.target.value)} placeholder="Ingrese el modelo"></input>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => limpiarCampos()}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={(e) => guardado((e))}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}