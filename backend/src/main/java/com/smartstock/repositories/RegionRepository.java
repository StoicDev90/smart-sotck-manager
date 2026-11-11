package com.smartstock.repositories;

import com.smartstock.models.RegionModel;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegionRepository extends CrudRepository<RegionModel, Long> {

}
