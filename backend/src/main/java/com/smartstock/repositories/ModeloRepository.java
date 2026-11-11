package com.smartstock.repositories;

import com.smartstock.models.ModeloModel;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModeloRepository extends CrudRepository<ModeloModel, Long> {
    
}
