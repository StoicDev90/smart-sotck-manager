package com.smartstock.repositories;

import com.smartstock.models.AsignacionModel;
import com.smartstock.models.PersonaModel;
import com.smartstock.models.RecursoModel;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AsignacionRepository extends CrudRepository<AsignacionModel, Long> {
    
    @Query(
        "SELECT COUNT (a) > 0 " +
        "FROM AsignacionModel a " +
        "WHERE a.asignado_a = :persona " +
        "AND a.recurso = :recurso " +
        "AND a.fecha_baja IS NULL"
    )
    boolean existeAsignacionActiva(
        @Param("persona") PersonaModel persona,
        @Param("recurso") RecursoModel recurso
    );

    @Query(
        "SELECT a " +
        "FROM AsignacionModel a " +
        "WHERE a.recurso = :recurso " +
        "AND a.fecha_baja IS NULL"
    )
    List<AsignacionModel> findAsignacionesActivas(@Param("recurso") RecursoModel recurso);
}
