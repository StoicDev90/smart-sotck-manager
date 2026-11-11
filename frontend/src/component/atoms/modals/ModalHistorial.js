import React, { useEffect, useState, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import Asignacion from '../../../models/Asignacion';
import { Api } from '../../../services/ApiService';
import ReactTooltip from 'react-tooltip';
import Can from "../../Can";

export default function ModalHistorial(props) {

    const idRecurso = props.id;
    const [recurso, setRecurso] = useState(null);
    const [asignaciones, setAsignaciones] = useState(null);

    useEffect(() => {
        leerRecurso();
    }, [idRecurso]);

    useEffect(() => {
        if (recurso != null) {
            setAsignaciones(recurso.asignaciones);
        }
    }, [recurso]);

    async function leerRecurso() {
        await Api.getRecurso(idRecurso).then((item) => {
            setRecurso(item);
        });
    }

    if (!recurso || !asignaciones) return (
        <div className="d-flex justify-content-center mt-5 text-primary">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
    function formatear(a) {
        if (!a) return "Vigente";
        let date = new Date(a);
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleString('es-AR', options);
    }

    async function bajaAsignacion(e, id) {
        e.preventDefault();
        
        try{
            await Api.bajaAsignacion(id);
            await leerRecurso();
            alert("Asignacion dada de baja correctamente.")
        } catch (error){
            alert("Error al dar de baja la asignacion.");
            console.error(error);
        }
    }

    const columns = [
        {
            name: 'Asignado a',
            selector: row => row.asignado_a.nombre,
            sortable: true,
            width: '200px'
        },
        {
            name: 'Ubicacion',
            cell: row => (
                <div>
                    {row.ceco.descripcion + ', ' + row.celo.nombre}
                </div>
            ),
            sortable: true
        },
        {
            name: 'Fecha desde',
            cell: row => (
                <a>
                    {formatear(row.fecha_alta)}
                </a>
            ),
            sortable: true
        },
        {
            name: 'Fecha hasta',
            cell: row => (
                <a>
                    {formatear(row.fecha_baja)}
                </a>
            ),
            sortable: true
        },
        {
            name: 'Asignado por',
            selector: row => row.asignado_por.nombre,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: row => (
                row.fecha_baja != null ||
                <Can permisos={["RECURSO_DESASIGNAR"]}>
                    <button className="btn" data-tip="Dar de baja" onClick={(e) => bajaAsignacion(e, row.id)}>
                        <span className="bi-arrow-90deg-down"></span>
                    </button>
                </Can>
            )
        }
    ]

    return (
        <Fragment>
            <ReactTooltip />
            <h5 className="ms-2 text-center">Historial de asignaciones</h5>
            <div className="row justify-content-center ms-2">
                <DataTable
                    columns={columns}
                    data={asignaciones}
                    striped={true}
                    noDataComponent="No hay nada que mostrar!"
                />
            </div>
        </Fragment>
    )
}