import React, { useState, useEffect, Fragment } from 'react';
import { Api } from '../services/ApiService';
import '../assets/styles/VerEquipos.css';
import ConfirmarEliminado from '../component/atoms/ConfirmarEliminado';
import { Toast } from 'bootstrap';
import DataTable from 'react-data-table-component';
import Can from '../component/Can';

export default function CargaMarca() {

    const [_marcaInput, setMarcaInput] = useState('');
    const [_todasLasMarcas, setTodasLasMarcas] = useState([]);
    const [_idModificar, setIdModificar] = useState(-1);
    const [_modalTitle, setModalTitle] = useState("");
    const [_inputFiltro, setInputFiltro] = useState("");

    const [_tipos, setTipos] = useState([]);
    const [_tiposMarca, setTiposMarca] = useState([]);

    let filtrados = _todasLasMarcas.filter((marca) => (
        (marca.nombre).toLowerCase().includes(_inputFiltro.toLowerCase())
    ));

    useEffect(() => {
        leerMarcas();
        leerTipos();
    }, []);


    function leerMarcas() {
        Api.get('marca').then((marcas) => {
            setTodasLasMarcas(marcas);
        })
    }

    function leerTipos() {
        Api.get("tipo").then((data) => {
            setTipos(data);
        });
    }

    const tocarTipo = (tipo) => {
        setTiposMarca(prev => {
            const existe = prev.some(p => p.id === tipo.id);

            if (existe) {
                return prev.filter(p => p.id !== tipo.id);
            } else {
                return [...prev, tipo];
            }
        });
    }

    function obtenerIdsTipos(lista) {
        return lista.map(tipo => tipo.id);
    }

    async function agregarMarca(e) {
        e.preventDefault();
        const data = {
            nombre: _marcaInput,
            tipos: _tiposMarca
        }
        await Api.postMarcas(data);
        alert("Marca guardada correctamente.");
        leerMarcas();
        setMarcaInput('');
    }

    async function eliminarMarca(id) {
        ;
        await Api.deleteMarcas(id)
        leerMarcas();
    }

    async function modificarMarca(e) {
        e.preventDefault();
        const data = {
            id: _idModificar,
            nombre: _marcaInput,
            tipos: _tiposMarca
        };
        await Api.putMarcas(data);
        alert("Marca editada correctamente");
        setMarcaInput('');
        setIdModificar(-1);
        leerMarcas();
    }

    function guardado(event) {
        event.preventDefault();
        if (_idModificar === -1) {
            agregarMarca(event);
        } else {
            modificarMarca(event);
        }
    }
    async function mostrarMod(e, id_value, marca_value) {
        setModalTitle('Modificar Marca');
        setMarcaInput(marca_value)
        setIdModificar(id_value);
        await Api.getMarca(id_value).then((marca) =>{
            setTiposMarca(marca.tipos);
        })
    }

    function cerrarMod() {
        setIdModificar(-1);
        setMarcaInput('');
    }

    function mostrarToast(id) {
        setIdModificar(id);
        var toastLiveExample = document.getElementById('toastPrueba');
        var toast = new Toast(toastLiveExample);
        toast.show()
    }
    const aceptar = () => {
        eliminarMarca(_idModificar);
        console.log('aceptar');
        setIdModificar(-1);
    }
    const rechazar = () => {
        setIdModificar(-1);
        console.log('rechazar');
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => (
                <Fragment>
                    <Can permisos={["MARCA_EDITAR"]}>
                        <button onClick={(e) => mostrarMod(e, row.id, row.nombre)} className="btn btn-success me-2 acciones" data-bs-toggle="modal" data-bs-target="#exampleModal"><span className="bi-pencil"></span></button>
                    </Can>
                    <Can permisos={["MARCA_ELIMINAR"]}>
                        <button onClick={() => mostrarToast(row.id)} className="btn btn-danger acciones"><span className="bi-trash"></span></button>
                    </Can>
                </Fragment>
            )
        }
    ]

    return (
        <div>
            <div className="container">
                <ConfirmarEliminado aidi="toastPrueba" rechazar={rechazar} aceptar={aceptar}></ConfirmarEliminado>
                <div className="d-flex justify-content-center align-items-center">
                    <h1 className="text-center my-3">Marcas</h1>
                    <Can permisos={["MARCA_CREAR"]}>
                        <button className="boton-anadir" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setModalTitle('Agregar Marca')}><span className="bi-plus"></span></button>
                    </Can>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-2">
                    <input value={_inputFiltro} onChange={(e) => setInputFiltro(e.target.value)} placeholder="Filtrar" />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-4">
                    <DataTable
                        columns={columns}
                        data={filtrados}
                        pagination
                        striped={true}
                    />
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{_modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => cerrarMod()}></button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control w-100 mb-3" value={_marcaInput} onChange={(e) => setMarcaInput(e.target.value)} placeholder="Ingrese el nombre de la marca"></input>

                            <div className="mb-3">
                                <label className="form-label">
                                    Tipos permitidos
                                </label>

                                {_tipos.map(tipo => (
                                    <div className="form-check" key={tipo.id}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={_tiposMarca.some(t => t.id === tipo.id)}
                                            onChange={() => tocarTipo(tipo)}
                                        />

                                        <label className="form-check-label">
                                            {tipo.nombre}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => cerrarMod()}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => guardado((e))} data-bs-dismiss="modal">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
