package com.smartstock.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartstock.models.PrivilegioModel;
import com.smartstock.repositories.PrivilegioRepository;

@Service
public class PrivilegioService {

    @Autowired
    PrivilegioRepository repository;

    public ArrayList<PrivilegioModel> obtenerPrivilegios() {
        return (ArrayList<PrivilegioModel>) repository.findAll();
    }

    public PrivilegioModel guardarPrivilegio(PrivilegioModel privilegio) {
        return repository.save(privilegio);
    }

    public PrivilegioModel modificarPrivilegio(PrivilegioModel privilegio) {
        return repository.save(privilegio);
    }

    public boolean eliminarPrivilegio(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch(Exception e) {
            return false;
        }
    }
    
}
