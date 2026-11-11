package com.smartstock.services;

import java.util.ArrayList;

import com.smartstock.models.TipoModel;
import com.smartstock.repositories.TipoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TipoService {
    
    @Autowired
    TipoRepository repository;

    public ArrayList<TipoModel> obtenerTipos() {
        return (ArrayList<TipoModel>) repository.findAll();
    }

    public TipoModel guardarTipo(TipoModel tipo) {
        return repository.save(tipo);
    }

    public TipoModel modificarTipo(TipoModel tipo) {
        return repository.save(tipo);
    }

    public boolean eliminarTipo(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}