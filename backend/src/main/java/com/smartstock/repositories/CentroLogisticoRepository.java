package com.smartstock.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.smartstock.models.CentroLogisticoModel;

@Repository
public interface CentroLogisticoRepository extends CrudRepository<CentroLogisticoModel, Long> {

}
