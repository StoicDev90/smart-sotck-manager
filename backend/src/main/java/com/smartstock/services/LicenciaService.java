package com.smartstock.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartstock.dtos.LicenciaDTO;
import com.smartstock.models.LicenciaModel;
import com.smartstock.models.RecursoModel;
import com.smartstock.models.TipoModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.repositories.LicenciaRepository;
import com.smartstock.repositories.RecursoRepository;
import com.smartstock.repositories.TipoRepository;

@Service
public class LicenciaService {
    
    @Autowired
    LicenciaRepository repository;

    @Autowired
    TipoRepository tipoRepository;

    @Autowired
    RecursoRepository recursoRepository;

    public ArrayList<LicenciaModel> obtenerDatos_licencia() {
        return (ArrayList<LicenciaModel>) repository.findAll();
    }

    public LicenciaModel guardarDatos_licencia(LicenciaModel datos_licencia) {
        return repository.save(datos_licencia);
    }

    public LicenciaModel modificarDatos_licencia(LicenciaModel datos_licencia) {
        return repository.save(datos_licencia);
    }

    @Transactional
    public LicenciaModel crearLicencia(LicenciaDTO dto, UsuarioModel usuario) {
        TipoModel tipoLicencia;
        tipoLicencia = tipoRepository.findByNombre(("LICENCIA"))
            .orElseThrow(() -> new RuntimeException("Tipo LICENCIA no existe"));

        RecursoModel recurso = new RecursoModel();
        recurso.setTipo(tipoLicencia);
        recurso.setEstado("A");
        recurso.setFecha_creacion(LocalDateTime.now());
        recurso.setUltima_actualizacion_por(usuario);

        LicenciaModel licencia = new LicenciaModel();
        licencia.setNombre(dto.getNombre());
        licencia.setFecha_desde(dto.getFecha_desde());
        licencia.setFecha_hasta(dto.getFecha_hasta());
        licencia.setRecurso(recurso);

        recursoRepository.save(recurso);
        return repository.save(licencia);
    }

    @Transactional
    public LicenciaModel editarLicencia(Long id_licencia, LicenciaDTO dto, UsuarioModel usuario) {
        LicenciaModel licencia = repository.findById(id_licencia)
            .orElseThrow(() -> new RuntimeException("Licencia no encontrada"));

        if (dto.getNombre() != null) {
            licencia.setNombre(dto.getNombre());
        }
        if (dto.getFecha_desde() != null) {
            licencia.setFecha_desde(dto.getFecha_desde());
        }
        if (dto.getFecha_hasta() != null) {
            licencia.setFecha_hasta(dto.getFecha_hasta());
        }

        licencia.getRecurso().setFecha_ultima_actualizacion(LocalDateTime.now());
        licencia.getRecurso().setUltima_actualizacion_por(usuario);

        return repository.save(licencia);
    }

    public Optional<LicenciaModel> obtenerPorId(Long id) {
        return repository.encontrarLicenciaId(id);
    }

    public boolean eliminarDatos_licencia(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
