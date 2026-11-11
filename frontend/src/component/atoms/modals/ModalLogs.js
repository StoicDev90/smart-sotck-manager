import React, { useEffect, useState, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import Asignacion from '../../../models/Asignacion';
import { Api } from '../../../services/ApiService';
import ReactTooltip from 'react-tooltip';
import Can from "../../Can";

export default function ModalHistorial(props) {

    const idRecurso = props.id;
    const [recurso, setRecurso] = useState(null);
    const [logs, setLogs] = useState(null);

    useEffect(() => {
        leerRecurso();
    }, [idRecurso]);

    useEffect(() => {
        if (recurso != null) {
            setLogs(recurso.logs);
            console.log(logs);
        }
    }, [recurso]);

    async function leerRecurso() {
        await Api.getRecurso(idRecurso).then((item) => {
            setRecurso(item);
        });
    }

    if (!recurso || !logs) return (
        <div className="d-flex justify-content-center mt-5 text-primary">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    function formatear(a) {
        let date = new Date(a);
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleString('es-AR', options);
    }

    const columns = [
        {
            name: 'Accion',
            selector: row => row.tipoEvento
        },
        {
            name: 'Fecha',
            cell: row => (
                <a>
                    {formatear(row.fecha)}
                </a>
            )
        },
        {
            name: 'Por',
            selector: row => row.usuario.nombre
        },
        {
            name: 'Motivo',
            selector: row => row.motivo
        }
    ]

    return (
        <Fragment>
            <ReactTooltip />
            <h5 className="ms-2 text-center">Historial del recurso</h5>
            <div className="row justify-content-center ms-2">
                <DataTable
                    columns={columns}
                    data={logs}
                    striped={true}
                    noDataComponent="No hay nada que mostrar!"
                />
            </div>
        </Fragment>
    )
}