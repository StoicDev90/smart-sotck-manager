package com.smartstock.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.smartstock.models.MonitorModel;

@Repository
public interface MonitorRepository extends CrudRepository<MonitorModel, Long> {
    
    @Query("SELECT m FROM MonitorModel m WHERE m.id_monitor = :id")
    Optional<MonitorModel> encontrarMonitorId(@Param("id") Long id);
}
