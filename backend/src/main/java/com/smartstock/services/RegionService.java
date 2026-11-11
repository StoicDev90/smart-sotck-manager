package com.smartstock.services;

import java.util.ArrayList;

import com.smartstock.models.RegionModel;
import com.smartstock.repositories.RegionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegionService {
    
    @Autowired
    RegionRepository repository;

    public ArrayList<RegionModel> obtenerRegiones() {
        return (ArrayList<RegionModel>) repository.findAll();
    }

    public RegionModel guardarRegion(RegionModel region) {
        return repository.save(region);
    }

    public RegionModel modificarRegion(RegionModel region) {
        return repository.save(region);
    }

    public boolean eliminarRegion(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    {

    }
}
