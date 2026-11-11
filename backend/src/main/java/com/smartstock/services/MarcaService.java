package com.smartstock.services;

import java.util.ArrayList;
import java.util.Optional;

import com.smartstock.models.MarcaModel;
import com.smartstock.repositories.MarcaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MarcaService {
    
    @Autowired
    MarcaRepository repository;

    public ArrayList<MarcaModel> obtenerMarcas() {
        return (ArrayList<MarcaModel>) repository.findAll();
    }

    public MarcaModel guardarMarca(MarcaModel marca) {
        return repository.save(marca);
    }

    public MarcaModel modificarMarca(MarcaModel marca) {
        return repository.save(marca);
    }

    public boolean eliminarMarca(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Optional<MarcaModel> obtenerPorId(Long id) {
        return repository.findById(id);
    }
}
