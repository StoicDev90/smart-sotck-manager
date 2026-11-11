package com.smartstock.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;


import com.smartstock.dtos.AsignacionDTO;
import com.smartstock.models.AsignacionModel;
import com.smartstock.models.CecoModel;
import com.smartstock.models.CentroLogisticoModel;
import com.smartstock.models.PersonaModel;
import com.smartstock.models.RecursoModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.repositories.AsignacionRepository;
import com.smartstock.repositories.CecoRepository;
import com.smartstock.repositories.CentroLogisticoRepository;
import com.smartstock.repositories.PersonaRepository;
import com.smartstock.repositories.RecursoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AsignacionService {
    
    @Autowired
    AsignacionRepository asignacionRepository;

    @Autowired
    RecursoRepository recursoRepository;

    @Autowired
    PersonaRepository personaRepository;

    @Autowired
    CecoRepository cecoRepository;

    @Autowired
    CentroLogisticoRepository celoRepository;

    public ArrayList<AsignacionModel> obtenerAsignaciones() {
        return (ArrayList<AsignacionModel>) asignacionRepository.findAll();
    }

    public Optional<AsignacionModel> obtenerPorId(long id) {
        return  asignacionRepository.findById(id);
    }

    /*
    @Transactional
    public AsignacionModel guardarAsignacion(AsignacionModel asignacion) {
        Optional<RecursoModel> _recurso = recursoRepository.findById(asignacion.getRecurso().getId_recurso());
        if (_recurso.get().getUltima_asignacion() != null)
            _recurso.get().getUltima_asignacion().setFecha_baja(Date.valueOf(LocalDate.now()));
        return asignacionRepository.save(asignacion);
    }
    */

    @Transactional
    public AsignacionModel guardarAsignacion(AsignacionDTO dto, UsuarioModel usuario) {
        
        RecursoModel recurso = recursoRepository.findById(dto.getId_recurso())
            .orElseThrow(() -> new RuntimeException("Recurso no existe"));
        
        PersonaModel persona = personaRepository.findById(dto.getLogin_asignado_a())
            .orElseThrow(() -> new RuntimeException("Persona no existe"));

        CecoModel ceco = cecoRepository.findById(dto.getId_ceco())
            .orElseThrow(() -> new RuntimeException("Ceco no existe"));

        CentroLogisticoModel celo = celoRepository.findById(dto.getId_celo())
            .orElseThrow(() -> new RuntimeException("Celo no existe"));

        if(asignacionRepository.existeAsignacionActiva(persona, recurso)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La persona ya tiene una asignacion activa");
        }

        AsignacionModel asignacion = new AsignacionModel();
        asignacion.setAsignado_a(persona);
        asignacion.setEquipo(recurso);
        asignacion.setAsignado_por(usuario);
        asignacion.setCeco(ceco);
        asignacion.setCelo(celo);

        if(dto.getFecha_alta() != null && dto.getFecha_alta().toLocalDate().isAfter(LocalDate.now())) {
            throw new RuntimeException("La fecha de asignacion no puede ser futura");
        }

        LocalDateTime fecha_alta = 
            dto.getFecha_alta() != null
                ? dto.getFecha_alta()
                : LocalDateTime.now();
        asignacion.setFecha_alta(fecha_alta);


        return asignacionRepository.save(asignacion);
    }

    public AsignacionModel bajaAsignacion(Long id_asignacion, UsuarioModel usuario) {
        AsignacionModel asignacion = asignacionRepository.findById(id_asignacion)
                .orElseThrow(() -> new RuntimeException("Asignacion no encontrada"));
        
        if(asignacion.getFecha_baja() != null)
            throw new RuntimeException("La asignacion ya esta dada de baja");

        asignacion.setFecha_baja(LocalDateTime.now());
        return asignacionRepository.save(asignacion);
    }


    public AsignacionModel modificarAsignacion(AsignacionModel asignacion) {
        return asignacionRepository.save(asignacion);
    }

    public boolean eliminarAsignacion(Long id) {
        try {
            asignacionRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
