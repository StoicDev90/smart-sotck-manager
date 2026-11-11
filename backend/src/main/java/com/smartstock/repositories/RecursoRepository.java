package com.smartstock.repositories;

import com.smartstock.models.RecursoModel;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecursoRepository extends CrudRepository<RecursoModel, Long> {
    
    List<RecursoModel> findAllByTipoId(Long id);
}
