import React, { useState, useEffect, Fragment } from "react";
import { Api } from "../../../services/ApiService";
import Can from "../../Can";

export default function ModalUsuarios(props) {

    const idUsuario = props.id;
    const [loginInput, setLoginInput] = useState('');
    const [nombreInput, setNombreInput] = useState('');
    const [habilitadoInput, setHabilitadoInput] = useState('');
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        leerUsuario(idUsuario);
    }, [idUsuario]);

    function leerUsuario(id) {
        if (id > 0) {
            Api.getUsuario(id).then((usuario) => {
                setLoginInput(usuario.login);
                setNombreInput(usuario.nombre);
                setHabilitadoInput(usuario.habilitado);
                setRoles(usuario.roles);
            })
        } else {
            limpiarPantalla();
        }
    }

    async function guardarUsuario(e) {
        e.preventDefault();

        console.log(idUsuario);
        if (idUsuario === -1) {
            const data = {
                login: loginInput,
                nombre: nombreInput,
                habilitado: habilitadoInput
            }
            try {
                await Api.postUsuario(data);
                alert("Usuario creado correctamente");
            } catch (error) {
                console.error(error);
                alert("Error al crear usuario");
            }
        }
        else {
            const data = {
                id_usuario: idUsuario,
                login: loginInput,
                nombre: nombreInput,
                habilitado: habilitadoInput,
                roles: roles
            }
            try {
                await Api.putUsuario(data);
                alert("Usuario editado correctamente");
            } catch (error) {
                console.error(error);
                alert("Error al editar usuario");
            }
        }
    }


    function limpiarPantalla() {
        setLoginInput('');
        setNombreInput('');
        setHabilitadoInput(null);
        setRoles([]);
    }

    return (
        <Fragment>
            <div className="container">
                <h5 className="text-center">Usuario</h5>
                <div className="card-body rounded border border-2">
                    <form onSubmit={(e) => guardarUsuario(e)}>
                        <div className="row d-flex justify-content-center">
                            <div className="col-6 mb-2">
                                <label>Login</label>
                                <input className="h-50 w-100 pb-2" value={loginInput || ""} onChange={(e) => setLoginInput(e.target.value)} placeholder="Login"></input>
                            </div>
                            <div className="col-6 mb-2">
                                <label>Nombre</label>
                                <input className="h-50 w-100 pb-2" value={nombreInput || ""} onChange={(e) => setNombreInput(e.target.value)} placeholder="Nombre"></input>
                            </div>
                            <div className="col-6 mb-2">
                                <label>Habilitado</label>
                                <input type="checkbox" checked={habilitadoInput || 0} onChange={(e) => setHabilitadoInput(e.target.checked)}></input>
                            </div>
                        </div>
                        <Can permisos={["USUARIO_CREAR", "USUARIO_EDITAR"]}>
                            <button type="submit" className="btn btn-success ms-5">Guardar</button>
                        </Can>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}