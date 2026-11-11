package com.smartstock.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartstock.dtos.CelularDTO;
import com.smartstock.models.CelularModel;
import com.smartstock.models.ModeloModel;
import com.smartstock.models.RecursoModel;
import com.smartstock.models.TipoModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.repositories.CelularRepository;
import com.smartstock.repositories.ModeloRepository;
import com.smartstock.repositories.RecursoRepository;
import com.smartstock.repositories.TipoRepository;

@Service
public class CelularService {
    
    @Autowired
    CelularRepository repository;

    @Autowired
    TipoRepository tipoRepository;

    @Autowired
    ModeloRepository modeloRepository;

    @Autowired
    RecursoRepository recursoRepository;

    public ArrayList<CelularModel> obtenerDatos_celular() {
        return (ArrayList<CelularModel>) repository.findAll();
    }

    public CelularModel guardarDatos_celular(CelularModel datos_celular) {
        return repository.save(datos_celular);
    }

    public CelularModel modificarDatos_celular(CelularModel datos_celular) {
        return repository.save(datos_celular);
    }

    @Transactional
    public CelularModel crearCelular(CelularDTO dto, UsuarioModel usuario) {
        TipoModel tipoCelular;
        tipoCelular = tipoRepository.findByNombre(("CELULAR"))
            .orElseThrow(() -> new RuntimeException("Tipo CELULAR no existe"));
    
        RecursoModel recurso = new RecursoModel();
        recurso.setTipo(tipoCelular);
        recurso.setEstado("A");
        recurso.setFecha_creacion(LocalDateTime.now());
        recurso.setUltima_actualizacion_por(usuario);

        CelularModel celular = new CelularModel();
        celular.setSerial_number(dto.getSerial_number());
        celular.setNumero_linea(dto.getNumero_linea());
        celular.setModelo(modeloRepository.findById(dto.getId_modelo())
                .orElseThrow(() -> new RuntimeException("Modelo no encontrado")));
        celular.setRecurso(recurso);

        recursoRepository.save(recurso);
        return repository.save(celular);
    }

    @Transactional
    public CelularModel editarCelular(Long id_celular, CelularDTO dto, UsuarioModel usuario) {
        CelularModel celular = repository.findById(id_celular)
            .orElseThrow(() -> new RuntimeException("Celular no encontrado"));
        
        if(dto.getId_modelo() != null) {
            ModeloModel modelo = modeloRepository.findById(dto.getId_modelo())
                .orElseThrow(() -> new RuntimeException("Modelo no encontrado"));
            celular.setModelo(modelo);
        }

        if (dto.getSerial_number() != null) {
            celular.setSerial_number(dto.getSerial_number());
        }

        if (dto.getNumero_linea() != null) {
            celular.setNumero_linea(dto.getNumero_linea());
        }

        celular.getRecurso().setFecha_ultima_actualizacion(LocalDateTime.now());
        celular.getRecurso().setUltima_actualizacion_por(usuario);

        return repository.save(celular);
    }

    public Optional<CelularModel> obtenerPorId(Long id) {
        return repository.encontrarCelularId(id);
    }

    public boolean eliminarDatos_celular(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
