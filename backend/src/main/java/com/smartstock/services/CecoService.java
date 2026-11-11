package com.smartstock.services;

import java.util.ArrayList;

import com.smartstock.models.CecoModel;
import com.smartstock.repositories.CecoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CecoService {
    
    @Autowired
    CecoRepository repository;

    public ArrayList<CecoModel> obtenerSectores() {
        return (ArrayList<CecoModel>) repository.findAll();
    }

    public CecoModel guardarSector(CecoModel ceco) {
        return repository.save(ceco);
    }

    public CecoModel modificarSector(CecoModel ceco) {
        return repository.save(ceco);
    }

    public boolean eliminarSector(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
