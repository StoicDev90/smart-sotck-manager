package com.smartstock.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.smartstock.models.RolModel;

@Repository
public interface RolRepository extends CrudRepository<RolModel, Long>{

    
}
