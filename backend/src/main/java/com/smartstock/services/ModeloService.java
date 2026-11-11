package com.smartstock.services;

import java.util.ArrayList;

import com.smartstock.models.ModeloModel;
import com.smartstock.repositories.ModeloRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ModeloService {
    
    @Autowired
    ModeloRepository repository;

    public ArrayList<ModeloModel> obtenerModelos() {
        return (ArrayList<ModeloModel>) repository.findAll();
    }

    public ModeloModel guardarModelo(ModeloModel modelo) {
        return repository.save(modelo);
    }

    public ModeloModel modificarModelo(ModeloModel modelo) {
        return repository.save(modelo);
    }

    public boolean eliminarModelo(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
