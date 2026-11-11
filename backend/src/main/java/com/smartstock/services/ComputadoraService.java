package com.smartstock.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartstock.repositories.ComputadoraRepository;
import com.smartstock.repositories.ModeloRepository;
import com.smartstock.repositories.RecursoRepository;
import com.smartstock.repositories.TipoRepository;
import com.smartstock.dtos.ComputadoraDTO;
import com.smartstock.models.ComputadoraModel;
import com.smartstock.models.ModeloModel;
import com.smartstock.models.RecursoModel;
import com.smartstock.models.TipoModel;
import com.smartstock.models.UsuarioModel;

@Service
public class ComputadoraService {
    
    @Autowired
    ComputadoraRepository repository;

    @Autowired
    TipoRepository tipoRepository;

    @Autowired
    ModeloRepository modeloRepository;

    @Autowired
    RecursoRepository recursoRepository;

    public ArrayList<ComputadoraModel> obtenerDatos_cpu() {
        return (ArrayList<ComputadoraModel>) repository.findAll();
    }

    public Optional<ComputadoraModel> obtenerPorId(Long id) {
        return repository.encontrarCompuId(id);
    }

    public ComputadoraModel guardarDatos_cpu(ComputadoraModel datos_cpu) {
        return repository.save(datos_cpu);
    }

    @Transactional
    public ComputadoraModel crearComputadora(ComputadoraDTO dto, UsuarioModel usuario) {
        TipoModel tipoComputadora;
        tipoComputadora = tipoRepository.findByNombre(("CPU"))
            .orElseThrow(() -> new RuntimeException("Tipo COMPUTADORA no existe"));
        
        RecursoModel recurso = new RecursoModel();
        recurso.setTipo(tipoComputadora);
        recurso.setEstado("A");
        recurso.setFecha_creacion(LocalDateTime.now());
        recurso.setUltima_actualizacion_por(usuario);

        ComputadoraModel computadora = new ComputadoraModel();
        computadora.setNombre(dto.getNombre());
        computadora.setTag(dto.getTag());
        computadora.setSerial_number(dto.getSerial_number());
        computadora.setGw(dto.getGw());
        computadora.setIp(dto.getIp());
        computadora.setSm(dto.getSm());
        computadora.setModelo(modeloRepository.findById(dto.getId_modelo())
                .orElseThrow(() -> new RuntimeException("Modelo no encontrado")));
        computadora.setRecurso(recurso);

        recursoRepository.save(recurso);
        return repository.save(computadora);
    }

    @Transactional
    public ComputadoraModel editarComputadora(Long id_cpu, ComputadoraDTO dto, UsuarioModel usuario) {
        ComputadoraModel computadora = repository.findById(id_cpu)
                .orElseThrow(() -> new RuntimeException("Computadora no encontrada"));
        
        if(dto.getNombre() != null)
            computadora.setNombre(dto.getNombre());

        if(dto.getTag() != null)
            computadora.setTag(dto.getTag());

        if(dto.getSerial_number() != null)
            computadora.setSerial_number(dto.getSerial_number());

        if(dto.getGw() != null)
            computadora.setGw(dto.getGw());
        
        if(dto.getSm() != null)
            computadora.setSm(dto.getSm());

        if(dto.getIp() != null)
            computadora.setIp(dto.getIp());

        if (dto.getId_modelo() != null) {
            ModeloModel modelo = modeloRepository.findById(dto.getId_modelo())
                    .orElseThrow(() -> new RuntimeException("Modelo no encontrado"));
            computadora.setModelo(modelo);
        }

        computadora.getRecurso().setFecha_ultima_actualizacion(LocalDateTime.now());
        computadora.getRecurso().setUltima_actualizacion_por(usuario);

        return repository.save(computadora);
    }

    public ComputadoraModel modificarDatos_cpu(ComputadoraModel datos_cpu) {
        return repository.save(datos_cpu);
    }

    public boolean eliminarDatos_cpu(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
