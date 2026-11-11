import React, { useState, useEffect, Fragment } from "react";
import { Api } from "../../../services/ApiService";
import Can from "../../Can";

export default function ModalPrivilegios() {

    const [nombreInput, setNombreInput] = useState('');

    async function guardarPrivilegio(e) {
        e.preventDefault();
        const payload = {
            nombre: nombreInput
        };
        try {
            await Api.crearPrivilegio(payload);
            alert("Privilegio creado correctamente");
        } catch (error) {
            console.error(error);
            alert("Error al crear privilegio");
        }
    }

    return (
        <Fragment>
            <div className="container">
                <h5 className="text-center">Privilegio</h5>
                <div className="card-body rounded border border-2">
                    <form onSubmit={(e) => guardarPrivilegio(e)}>
                        <div className="row d-flex justify-content-center">
                            <div className="col-6 mb-2">
                                <label>Nombre</label>
                                <input className="h-50 w-100 pb-2" onChange={(e) => setNombreInput(e.target.value)} placeholder="Nombre del privilegio"></input>
                            </div>
                        </div>
                        <Can permisos={["PRIVILEGIO_CREAR", "PRIVILEGIO_EDITAR"]}>
                            <button type="submit" className="btn btn-success ms-5">Guardar</button>
                        </Can>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}