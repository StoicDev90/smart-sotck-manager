package com.smartstock.repositories;

import com.smartstock.models.PersonaModel;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends CrudRepository<PersonaModel, String> {

}
