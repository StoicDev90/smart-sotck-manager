package com.smartstock.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.smartstock.models.PrivilegioModel;

@Repository
public interface PrivilegioRepository extends CrudRepository<PrivilegioModel, Long> {
    
}
