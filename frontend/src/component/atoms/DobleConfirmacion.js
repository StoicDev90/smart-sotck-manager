import React from 'react';

export default function DobleConfirmacion (props) {

    return (
        <div id={props.aidi} className="toast color-fondo" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <strong className="me-auto text-center">Atencion!</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                <div className="row">
                    <h5>{props.texto}</h5>
                </div>
                <div className="row d-flex justify-content-around my-1">
                    <button className="button rounded round-3 btn-danger col-5" data-bs-dismiss="toast" onClick={props.rechazar}>Cancelar</button>
                    <button className="button rounded round-3 btn-success col-5" data-bs-dismiss="toast" onClick={props.aceptar}>Aceptar</button>
                </div>
            </div>
        </div>
    )
}