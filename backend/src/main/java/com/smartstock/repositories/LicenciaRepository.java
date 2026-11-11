package com.smartstock.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.smartstock.models.LicenciaModel;

@Repository
public interface LicenciaRepository extends CrudRepository<LicenciaModel, Long> {
    
    @Query("SELECT l FROM LicenciaModel l WHERE l.id_licencia = :id")
    Optional<LicenciaModel> encontrarLicenciaId(@Param("id") Long id);
}
