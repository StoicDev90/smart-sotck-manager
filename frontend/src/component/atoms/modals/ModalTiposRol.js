import React, { useState, useEffect, Fragment } from "react";
import { Api } from "../../../services/ApiService";
import Can from "../../Can.jsx"

export default function ModalTiposRol(props){
    const idRol = props.id;
    const [nombre, setNombre] = useState('');

    const [tipos, setTipos] = useState([]);
    const [tiposRol, setTiposRol] = useState([]);

    useEffect(() => {
        leerRol(idRol);
        traerTipos();
    }, [idRol]);

    async function leerRol(id) {
        if (id > 0) {
            await Api.getRol(id).then((rol) => {
                setNombre(rol.nombre);
                console.log(rol)
                setTiposRol(rol.tipos);
            })
        }
        
    }

    function traerTipos() {
        Api.get("tipo").then((data) => {
            setTipos(data);
        })
    }

    const tocarTipo = (tipo) => {
        setTiposRol(prev => {
            const existe = prev.some(p => p.id === tipo.id);

            if(existe) {
                return prev.filter(p => p.id !==  tipo.id);
            } else {
                return [...prev, tipo];
            }
        });
    }

    function obtenerIdsTipos(lista) {
        return lista.map(tipo => tipo.id);
    }
    
    async function guardarTiposRol(e) {
        e.preventDefault();

        const idsTipos = obtenerIdsTipos(tiposRol);
        
        try {
            await Api.asignarTipoRol(idRol, idsTipos);
            alert("Tipos asignados correctamente.");
        } catch (error) {
            console.error(error);
            alert("Error al asignar los privilegios al rol");
        }
    }




    return (
        <Fragment>
            <div className="container">
                <h5 className="text-center">Tipos del rol</h5>
                <div className="card-body rounded border border-2">
                    <form onSubmit={(e) => guardarTiposRol(e)}>
                        <div className="row d-flex justify-content-center">
                            {nombre}
                            {tipos.map(tipo => (
                                <label key={tipo.nombre} style={{ display: 'block' }}>
                                    <input
                                        type="checkbox"
                                        checked={tiposRol.some(t => t.id === tipo.id)}
                                        onChange={() => tocarTipo(tipo)}
                                    />
                                    {tipo.nombre}
                                </label>
                            ))}
                        </div>
                        <Can permisos={["ROL_ASIGNAR_PRIVILEGIO"]}>
                            <button type="submit" className="btn btn-success ms-5">Guardar</button>
                        </Can>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
