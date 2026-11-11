package com.smartstock.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.smartstock.models.PrivilegioModel;
import com.smartstock.models.RolModel;
import com.smartstock.models.TipoModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartstock.repositories.PrivilegioRepository;
import com.smartstock.repositories.RolRepository;
import com.smartstock.repositories.TipoRepository;

@Service
public class RolService {

    @Autowired
    RolRepository repository;

    @Autowired
    PrivilegioRepository privilegioRepository;

    @Autowired
    TipoRepository tipoRepository;

    public ArrayList<RolModel> obtenerRoles() {
        return (ArrayList<RolModel>) repository.findAll();
    }

    public RolModel guardarRol(RolModel rol) {
        return repository.save(rol);
    }

    @Transactional
    public RolModel asignarPrivilegios(Long id_rol, List<Long> ids_privilegio) {
        RolModel rol = repository.findById(id_rol)
                .orElseThrow(() -> new RuntimeException("No se encontro el rol"));

        Set<PrivilegioModel> privilegios = new HashSet<>();

        privilegioRepository.findAllById(ids_privilegio)
                .forEach(privilegios::add);

        rol.setPrivileges(privilegios);
        return repository.save(rol);
    }

    @Transactional
    public RolModel asignarTipos(Long id_rol, List<Long> ids_tipo) {
        RolModel rol = repository.findById(id_rol)
            .orElseThrow(() -> new RuntimeException("No se encontro el rol"));

        Set<TipoModel> tipos = new HashSet<>();

        tipoRepository.findAllById(ids_tipo)
            .forEach(tipos::add);

        rol.setTipos(tipos);
        return repository.save(rol);
    }

    public Optional<RolModel> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public RolModel modificarRol(RolModel rol) {
        return repository.save(rol);
    }

    public boolean eliminarRol(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
