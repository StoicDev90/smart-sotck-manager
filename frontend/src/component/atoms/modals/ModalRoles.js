import React, { useState, useEffect, Fragment } from "react";
import { Api } from "../../../services/ApiService";
import Can from "../../Can";

export default function ModalRoles() {

    const [nombreInput, setNombreInput] = useState('');

    async function guardarRol(e) {
        e.preventDefault();
        const payload = {
            nombre: nombreInput
        };
        try {
            await Api.crearRol(payload);
            alert("Rol creado correctamente");
        } catch (error) {
            console.error(error);
            alert("Error al crear rol");
        }
    }

    return (
        <Fragment>
            <div className="container">
                <h5 className="text-center">Rol</h5>
                <div className="card-body rounded border border-2">
                    <form onSubmit={(e) => guardarRol(e)}>
                        <div className="row d-flex justify-content-center">
                            <div className="col-6 mb-2">
                                <label>Nombre</label>
                                <input className="h-50 w-100 pb-2" onChange={(e) => setNombreInput(e.target.value)} placeholder="Nombre del rol"></input>
                            </div>
                        </div>
                        <Can permisos={["ROL_EDITAR", "ROL_CREAR"]}>
                            <button type="submit" className="btn btn-success ms-5">Guardar</button>
                        </Can>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}