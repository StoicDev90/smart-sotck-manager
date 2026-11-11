import { useState, useEffect, Fragment } from "react";
import { Api } from "../services/ApiService";
import { Toast } from 'bootstrap';
import DataTable from "react-data-table-component";
import ModalUsuarios from "../component/atoms/modals/ModalUsuarios";
import "../assets/styles/VerEquipos.css"
import ModalAsignarRoles from "../component/atoms/modals/ModalAsigarRoles";
import Can from "../component/Can";
import DobleConfirmacion from "../component/atoms/DobleConfirmacion";


export default function Usuarios() {

    const [_usuarios, setUsuarios] = useState([]);
    const [_idModificar, setIdModificar] = useState(-1);

    useEffect(() => {
        leerUsuarios();
    }, []);

    function leerUsuarios() {
        Api.get('usuario').then((usuarios) => {
            setUsuarios(usuarios);
        })
    }

    function bajaUsuario(e, row) {
        e.preventDefault();
        let habilitado = false;
        setUsuarioHabilitado(row, habilitado);
    }

    function altaUsuario(e, row) {
        e.preventDefault();
        let habilitado = true;
        setUsuarioHabilitado(row, habilitado);
    }

    async function eliminarUsuario(id) {
        try {
            await Api.deleteUsuario(id);
            alert("Usuario eliminado correctamente");
            leerUsuarios();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar el usuario.");
        }
    }

    async function setUsuarioHabilitado(row, habilitado) {
        const data = {
            id_usuario: row.id_usuario,
            login: row.login,
            nombre: row.nombre,
            habilitado: habilitado,
            roles: row.roles
        };
        await Api.putUsuario(data);
        leerUsuarios();
    }

    function listarRoles(a) {
        if (!a) return <p>Sin roles</p>
        if (a.length === 0) return <p>Sin roles</p>
        let lista = [];
        a.forEach(rol => {
            lista.push(rol.nombre);
        });
        return (
            <div className="text-left">
                <ul className="list-group">
                    {lista.map((el) => (
                        <li key={el}>{el}</li>
                    ))}
                </ul>
            </div>
        )
    }

    function setIdMod(e, row) {
        e.preventDefault();
        setIdModificar(row.id_usuario);
    }

    function mostrarModalUsuarios() {
        return <ModalUsuarios id={_idModificar}></ModalUsuarios>
    }

    function mostrarModalRolUsuarios() {
        return <ModalAsignarRoles id={_idModificar}></ModalAsignarRoles>
    }

    // --------------------- TOAST -----------------------
    function mostrarToast(id) {
        setIdModificar(id);
        var toastLiveExample = document.getElementById('toastPrueba');
        var toast = new Toast(toastLiveExample);
        toast.show();
    }
    const aceptar = () => {
        eliminarUsuario(_idModificar);
        setIdModificar(-1);
    }
    const rechazar = () => {
        setIdModificar(-1);
    }
    const texto = "Desea eliminar el usuario?"

    // ------------------- FIN TOAST ---------------------

    function cerrarModal() {
        setIdModificar(-1);
        leerUsuarios();
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id_usuario,
            sortable: true,
            width: "80px"
        },
        {
            name: 'LOGIN',
            selector: row => row.login,
            sortable: true
        },
        {
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'HABILITADO',
            cell: row => (
                <div>
                    {row.habilitado ? "Si" : "No"}
                </div>
            ),
            sortable: true,
            width: "120px"
        },
        {
            name: 'ROLES',
            cell: row => (
                <div>
                    {listarRoles(row.roles)}
                </div>
            ),
            grow: 2,
            center: true
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => (
                <Fragment>
                    <Can permisos={["USUARIO_ASIGNAR_ROL"]}>
                        <button onClick={(e) => setIdMod(e, row)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#rolUsuarioModal" data-tip="Edicion de Roles"><span className="bi-shield-plus"></span></button>
                    </Can>
                    {row.habilitado
                        ? <Can permisos={["USUARIO_EDITAR"]}><button onClick={(e) => bajaUsuario(e, row)} className="btn btn-white" data-tip="Deshabilitar"> <span className="bi-arrow-90deg-down"></span> </button></Can>
                        : <Can permisos={["USUARIO_EDITAR"]}><button onClick={(e) => altaUsuario(e, row)} className="btn btn-white" data-tip="Habilitar"> <span className="bi-arrow-90deg-up"></span> </button></Can>
                    }
                    <Can permisos={["USUARIO_EDITAR"]}>
                        <button onClick={() => setIdModificar(row.id_usuario)} className="btn btn-success" data-bs-toggle="modal" data-bs-target="#usuarioModal"><span className="bi-pencil"></span></button>
                    </Can>
                    <Can permisos={["USUARIO_ELIMINAR"]}>
                        <button onClick={() => mostrarToast(row.id_usuario)} className="btn btn-danger" data-tip="Eliminar"><span className="bi-trash"></span></button>
                    </Can>
                </Fragment>
            ),
            width: "200px"
        }
    ]

    const conditionalRowStyles = [
        {
            when: row => !row.habilitado,
            style: {
                color: 'gray'
            }
        }
    ]

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center">
                <h1 className="text-center my-3">Usuarios</h1>
                <Can permisos={["USUARIO_CREAR"]}>
                    <button className="boton-anadir" data-bs-toggle="modal" data-bs-target="#usuarioModal" data-tip="Edicion de Usuario"><span className="bi-plus"></span></button>
                </Can>
            </div>
            <div className="sticky-top justify-content-center d-flex">
                <DobleConfirmacion aidi="toastPrueba" rechazar={rechazar} aceptar={aceptar} texto={texto}></DobleConfirmacion>
            </div>
            <div className="row justify-content-center">
                <div className="col-12">
                    <DataTable
                        columns={columns}
                        data={_usuarios}
                        pagination
                        striped={true}
                        conditionalRowStyles={conditionalRowStyles}
                    />
                </div>
            </div>
            <div>
                <div className="modal fade bd-example-modal-lg" id="usuarioModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="usuarioModal">Edicion de Usuarios</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => cerrarModal()}></button>
                            </div>
                            <div className="modal-body">
                                {mostrarModalUsuarios()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="modal fade bd-example-modal-lg" id="rolUsuarioModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="rolUsuarioModal">Roles de usuario</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => cerrarModal()}></button>
                            </div>
                            <div className="modal-body">
                                {mostrarModalRolUsuarios()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}