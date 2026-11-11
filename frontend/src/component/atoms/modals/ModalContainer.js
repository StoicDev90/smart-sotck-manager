import React, { Fragment } from "react";

export default function ModalContainer(props) {

    let size = props.size;
    let titulo = props.titulo;

    return (
        <Fragment>
            <div>
                <div className="modal fade bd-example-modal-lg" id="nuevoEquipoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="nuevoEquipoModalLabel">{_tituloModal}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => cerrarModal()}></button>
                            </div>
                            <div className="modal-body">
                                {mostrarModalTipo()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}