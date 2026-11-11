package com.smartstock.repositories;

import com.smartstock.models.CecoModel;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CecoRepository extends CrudRepository<CecoModel, Long> {
}
