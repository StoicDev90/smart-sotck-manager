import { useState, useEffect, Fragment } from "react";
import { Api } from "../services/ApiService";
import DataTable from "react-data-table-component";
import "../assets/styles/VerEquipos.css"
import ModalPrivilegios from "../component/atoms/modals/ModalPrivilegios";
import Can from "../component/Can";

export default function Privilegios() {
    const [_privilegios, setPrivilegios] = useState([]);
    const [_idModificar, setIdModificar] = useState(-1);

    useEffect(() => {
        leerPrivilegios();
    }, []);

    async function leerPrivilegios() {
        await Api.get('privilegio').then((privilegios) => {
            setPrivilegios(privilegios);
        })
    }

    async function eliminarPrivilegio(e, id) {
        e.preventDefault();

        try {
            await Api.eliminarPrivilegio(id);
            alert("Privilegio eliminado correctamente");
            await leerPrivilegios();
        } catch(error) {
            console.error(error);
            alert("Error al eliminar el privilegio");
        }
    }

    function mostrarModalPrivilegios() {
        return <ModalPrivilegios></ModalPrivilegios>
    }

    async function cerrarModal() {
        await leerPrivilegios();
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id_privilegio,
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
                    <Can permisos={["PRIVILEGIO_ELIMINAR"]}>
                        <button onClick={(e) => eliminarPrivilegio(e, row.id_privilegio)} className="btn btn-danger acciones"><span className="bi-trash"></span></button>
                    </Can>
                </Fragment>
            )
        }
    ]

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center">
                <h1 className="text-center my-3">Privilegios</h1>
                <Can permisos={["PRIVILEGIO_CREAR"]}>
                    <button className="boton-anadir" data-bs-toggle="modal" data-bs-target="#privilegioModal" data-tip="Edicion de Usuario"><span className="bi-plus"></span></button>
                </Can>
            </div>
            <div className="row justify-content-center">
                <div className="col-12">
                    <DataTable
                        columns={columns}
                        data={_privilegios}
                        pagination
                        striped={true}
                    />
                </div>
            </div>

            <div>
                <div className="modal fade bd-example-modal-lg" id="privilegioModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="privilegioModal">Creacion de privilegios</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => cerrarModal()}></button>
                            </div>
                            <div className="modal-body">
                                {mostrarModalPrivilegios()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    )
}