package com.smartstock.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.smartstock.models.ComputadoraModel;

@Repository
public interface ComputadoraRepository extends CrudRepository<ComputadoraModel, Long> {
    
    @Query("SELECT c FROM ComputadoraModel c WHERE c.id_cpu = :id")
    Optional<ComputadoraModel> encontrarCompuId(@Param("id") Long id);
}
