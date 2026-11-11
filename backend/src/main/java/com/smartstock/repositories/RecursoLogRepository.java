package com.smartstock.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartstock.models.RecursoLogModel;

@Repository
public interface RecursoLogRepository extends JpaRepository<RecursoLogModel, Long>{
    
}
