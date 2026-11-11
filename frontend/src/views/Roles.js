import { useState, useEffect, Fragment } from "react";
import { Api } from "../services/ApiService";
import DataTable from "react-data-table-component";
import "../assets/styles/VerEquipos.css"
import ModalRoles from "../component/atoms/modals/ModalRoles";
import ModalAsignarPrivilegios from "../component/atoms/modals/ModalAsignarPrivilegios";
import ModalTiposRol from "../component/atoms/modals/ModalTiposRol";
import Can from "../component/Can";

export default function Privilegios() {
    const [_roles, setRoles] = useState([]);
    const [_idModificar, setIdModificar] = useState(-1);

    useEffect(() => {
        leerRoles();
    }, []);

    async function leerRoles() {
        await Api.get('rol').then((roles) => {
            setRoles(roles);
        })
    }

    async function eliminarRol(e, id) {
        e.preventDefault();

        try {
            await Api.eliminarRol(id);
            alert("Rol eliminado correctamente");
            await leerRoles();
        } catch(error) {
            console.error(error);
            alert("Error al eliminar el rol");
        }
    }

    function mostrarModalRoles() {
        return <ModalRoles></ModalRoles>
    }

    function mostrarModalPrivilegiosDelRol() {
        return <ModalAsignarPrivilegios id={_idModificar}></ModalAsignarPrivilegios>
    }

    function mostrarModalTiposDelRol() {
        return <ModalTiposRol id={_idModificar}></ModalTiposRol>
    }

    function setIdMod(e, row) {
        e.preventDefault();
        setIdModificar(row.id_rol);
    }

    async function cerrarModal() {
        await leerRoles();
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id_rol,
            sortable: true,
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
                    <Can permisos={["ROL_ASIGNAR_PRIVILEGIO"]}>
                        <button onClick={(e) => setIdMod(e, row)} className="btn btn-primary acciones" data-bs-toggle="modal" data-bs-target="#tiposDelRolModal" data-tip="Edicion de Tipos"><span className="bi-laptop"></span></button>
                        <button onClick={(e) => setIdMod(e, row)} className="btn btn-primary acciones" data-bs-toggle="modal" data-bs-target="#privilegiosDelRolModal" data-tip="Edicion de Privilegios"><span className="bi-shield-plus"></span></button>
                    </Can>
                    <Can permisos={["ROL_ELIMINAR"]}>
                        <button onClick={(e) => eliminarRol(e, row.id_rol)} className="btn btn-danger acciones"><span className="bi-trash"></span></button>
                    </Can>
                </Fragment>
            )
        }
    ]

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center">
                <h1 className="text-center my-3">Roles</h1>
                <Can permisos={["ROL_CREAR"]}>
                    <button className="boton-anadir" data-bs-toggle="modal" data-bs-target="#rolModal" data-tip="Crear rol"><span className="bi-plus"></span></button>
                </Can>
            </div>
            <div className="row justify-content-center">
                <div className="col-12">
                    <DataTable
                        columns={columns}
                        data={_roles}
                        pagination
                        striped={true}
                    />
                </div>
            </div>

            <div>
                <div className="modal fade bd-example-modal-lg" id="rolModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="rolModal">Creacion de roles</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => cerrarModal()}></button>
                            </div>
                            <div className="modal-body">
                                {mostrarModalRoles()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="modal fade bd-example-modal-lg" id="privilegiosDelRolModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="privilegiosDelRolModal">Privilegios del rol</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => cerrarModal()}></button>
                            </div>
                            <div className="modal-body">
                                {mostrarModalPrivilegiosDelRol()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="modal fade bd-example-modal-lg" id="tiposDelRolModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="privilegiosDelRolModal">Tipos del rol</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => cerrarModal()}></button>
                            </div>
                            <div className="modal-body">
                                {mostrarModalTiposDelRol()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    )
}