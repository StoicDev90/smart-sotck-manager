package com.smartstock.services;

import java.util.ArrayList;

import com.smartstock.models.LocalidadModel;
import com.smartstock.repositories.LocalidadRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocalidadService {
    
    @Autowired
    LocalidadRepository repository;

    public ArrayList<LocalidadModel> obtenerLocalidades() {
        return (ArrayList<LocalidadModel>) repository.findAll();
    }

    public LocalidadModel guardarLocalidad(LocalidadModel localidad) {
        return repository.save(localidad);
    }

    public LocalidadModel modificarLocalidad(LocalidadModel localidad) {
        return repository.save(localidad);
    }

    public boolean eliminarLocalidad(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
