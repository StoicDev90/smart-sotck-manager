package com.smartstock.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartstock.models.CentroLogisticoModel;
import com.smartstock.repositories.CentroLogisticoRepository;

@Service
public class CentroLogisticoService {

    @Autowired
    CentroLogisticoRepository repository;

    public ArrayList<CentroLogisticoModel> obtenerCeLos() {
        return (ArrayList<CentroLogisticoModel>) repository.findAll();
    }

    public CentroLogisticoModel guardarCeLo(CentroLogisticoModel centroLogistico) {
        return repository.save(centroLogistico);
    }

    public CentroLogisticoModel modificarCeLo(CentroLogisticoModel centroLogistico) {
        return repository.save(centroLogistico);
    }

    public boolean eliminarCeLo(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
