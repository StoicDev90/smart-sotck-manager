package com.smartstock.repositories;

import com.smartstock.models.TipoModel;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoRepository extends CrudRepository<TipoModel, Long> {

    Optional<TipoModel> findByNombre(String nombre);
}
