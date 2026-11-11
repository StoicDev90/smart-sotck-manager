package com.smartstock.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.smartstock.models.CelularModel;

@Repository
public interface CelularRepository extends CrudRepository<CelularModel, Long> {
    
    @Query("SELECT c FROM CelularModel c WHERE c.id_celular = :id")
    Optional<CelularModel> encontrarCelularId(@Param("id") Long id);
}
