package com.smartstock.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.smartstock.models.AsignacionModel;
import com.smartstock.models.RecursoLogModel;
import com.smartstock.models.RecursoModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.repositories.AsignacionRepository;
import com.smartstock.repositories.RecursoLogRepository;
import com.smartstock.repositories.RecursoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecursoService {
    
    @Autowired
    RecursoRepository repository;

    @Autowired
    AsignacionRepository asignacionRepository;

    @Autowired
    RecursoLogRepository recursoLogRepository;

    public ArrayList<RecursoModel> obtenerRecursos() {
        return (ArrayList<RecursoModel>) repository.findAll();
    }

    public RecursoModel guardarRecurso(RecursoModel equipo) {
        return repository.save(equipo);
    }

    public RecursoModel modificarRecurso(RecursoModel equipo) {
        return repository.save(equipo);
    }

    public void darDeBaja(Long id, UsuarioModel usuario, String motivo) {
        RecursoModel recurso = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("No se encontró el recurso."));

        if ("B".equals(recurso.getEstado())) {
            throw new RuntimeException("El recurso ya está dado de baja.");
        }

        LocalDateTime fechaBaja = LocalDateTime.now();

        recurso.setEstado("B");
        recurso.setFecha_baja(fechaBaja);
        recurso.setUltima_actualizacion_por(usuario);

        List<AsignacionModel> asignaciones = asignacionRepository.findAsignacionesActivas(recurso);

        for(AsignacionModel asignacion : asignaciones) {
            asignacion.setFecha_baja(fechaBaja);
        }

        RecursoLogModel log = new RecursoLogModel();
        log.setRecurso(recurso);
        log.setUsuario(usuario);
        log.setFecha(fechaBaja);
        log.setTipoEvento("BAJA");
        log.setMotivo(motivo);
        recursoLogRepository.save(log);

        repository.save(recurso);
    }

    public void darDeAlta(Long id, UsuarioModel usuario, String motivo) {
        RecursoModel recurso = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("No se encontró el recurso."));
        
        if ("A".equals(recurso.getEstado())) {
            throw new RuntimeException("El recurso ya esta dado de alta");
        }
        recurso.setEstado("A");
        recurso.setFecha_baja(null);
        recurso.setUltima_actualizacion_por(usuario);

        RecursoLogModel log = new RecursoLogModel();
        log.setRecurso(recurso);
        log.setUsuario(usuario);
        log.setFecha(LocalDateTime.now());
        log.setTipoEvento("ALTA");
        log.setMotivo(motivo);
        recursoLogRepository.save(log);

        repository.save(recurso);
    }

    public Optional<RecursoModel> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public List<RecursoModel> obtenerPorTipo(Long id) {
        return repository.findAllByTipoId(id);
    }

    public boolean eliminarRecurso(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
