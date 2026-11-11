import React, { useState, useEffect, Fragment } from "react";
import { Api } from "../../../services/ApiService";
import Can from "../../Can.jsx"

export default function ModalAsignarPrivilegios(props) {
    const idRol = props.id;
    const [nombre, setNombre] = useState('');
    
    const [privilegios, setPrivilegios] = useState([]);
    const [privilegiosRol, setPrivilegiosRol] = useState([]);


    useEffect(() => {
        leerRol(idRol);
        traerPrivilegios();
    }, [idRol]);

    async function leerRol(id) {
        if (id > 0) {
            await Api.getRol(id).then((rol) => {
                setNombre(rol.nombre);
                console.log(rol)
                setPrivilegiosRol(rol.privileges);
            })
        }
    }

    function traerPrivilegios() {
        Api.get("privilegio").then((data) => {
            setPrivilegios(data);
        })
    }

    const tocarPrivilegio = (priv) => {
        setPrivilegiosRol(prev => {
            const existe = prev.some(p => p.id_privilegio === priv.id_privilegio);

            if (existe) {
                return prev.filter(p => p.id_privilegio !== priv.id_privilegio);
            } else {
                return [...prev, priv];
            }
        });
    }

    function obtenerIdsPrivilegios(lista) {
        return lista.map(priv => priv.id_privilegio);
    }

    async function guardarPrivilegiosRol(e) {
        e.preventDefault();

        const idsPrivilegios = obtenerIdsPrivilegios(privilegiosRol)
        try {
            await Api.asignarPrivilegios(idRol, idsPrivilegios);
            alert("Privilegios asignados correctamente.");
        } catch(error) {
            console.error(error);
            alert("Error al asignar los privilegios al rol");
        }
        
    }

    return (
        <Fragment>
            <div className="container">
                <h5 className="text-center">Privilegios del rol</h5>
                <div className="card-body rounded border border-2">
                    <form onSubmit={(e) => guardarPrivilegiosRol(e)}>
                        <div className="row d-flex justify-content-center">
                            {nombre}
                            {privilegios.map(priv => (
                                <label key={priv.nombre} style={{ display: 'block' }}>
                                    <input
                                        type="checkbox"
                                        checked={privilegiosRol.some(p => p.id_privilegio === priv.id_privilegio)}
                                        onChange={() => tocarPrivilegio(priv)}
                                    />
                                    {priv.nombre}
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