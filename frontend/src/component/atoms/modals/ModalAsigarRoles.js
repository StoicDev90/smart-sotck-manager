import React, { useState, useEffect, Fragment } from "react";
import { Api } from "../../../services/ApiService";
import Can from "../../Can";

export default function ModalAsignarRoles(props) {
    const idUsuario = props.id;
    const [nombre, setNombre] = useState('');
    const [habilitado, setHabilitado] = useState();
    const [login, setLogin] = useState('');
    const [roles, setRoles] = useState([]);
    const [rolesUsuario, setRolesUsuario] = useState([]);


    useEffect(() => {
        leerUsuario(idUsuario);
        traerRoles();
    }, [idUsuario]);

    function leerUsuario(id) {
        if (id > 0) {
            Api.getUsuario(id).then((usuario) => {
                setNombre(usuario.nombre);
                setRolesUsuario(usuario.roles);
                setLogin(usuario.login);
                setHabilitado(usuario.habilitado);
            })
        }
    }

    function traerRoles() {
        Api.get("rol").then((data) => {
            setRoles(data);
        })
    }

    const tocarRol = (role) => {
        setRolesUsuario(prev => {
            const existe = prev.some(r => r.id_rol === role.id_rol);

            if (existe) {
                return prev.filter(r => r.id_rol !== role.id_rol);
            } else {
                return [...prev, role];
            }
        });
    }

    async function guardarRolesUsuario(e) {
        e.preventDefault();

        const data = {
            id_usuario: idUsuario,
            nombre: nombre,
            login: login,
            habilitado: habilitado,
            roles: rolesUsuario
        }
        await Api.putUsuario(data);
        console.log(roles);
        console.log(rolesUsuario);
    }

    return (
        <Fragment>
            <div className="container">
                <h5 className="text-center">Roles del usuario</h5>
                <div className="card-body rounded border border-2">
                    <form onSubmit={(e) => guardarRolesUsuario(e)}>
                        <div className="row d-flex justify-content-center">
                            {nombre}
                            {roles.map(role => (
                                <label key={role.nombre} style={{ display: 'block' }}>
                                    <input
                                        type="checkbox"
                                        checked={rolesUsuario.some(r => r.id_rol === role.id_rol)}
                                        onChange={() => tocarRol(role)}
                                    />
                                    {role.nombre}
                                </label>
                            ))}
                        </div>
                        <Can permisos={["USUARIO_EDITAR"]}>
                            <button type="submit" className="btn btn-success ms-5">Guardar</button>
                        </Can>
                    </form>
                </div>
            </div>
        </Fragment>
    )

}