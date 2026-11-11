package com.smartstock.repositories;

import com.smartstock.models.LocalidadModel;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalidadRepository extends CrudRepository<LocalidadModel, Long> {
    
}
