package com.smartstock.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartstock.dtos.MonitorDTO;
import com.smartstock.models.ModeloModel;
import com.smartstock.models.MonitorModel;
import com.smartstock.models.RecursoModel;
import com.smartstock.models.TipoModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.repositories.ModeloRepository;
import com.smartstock.repositories.MonitorRepository;
import com.smartstock.repositories.RecursoRepository;
import com.smartstock.repositories.TipoRepository;

@Service
public class MonitorService {

    @Autowired
    MonitorRepository repository;

    @Autowired
    TipoRepository tipoRepository;

    @Autowired
    ModeloRepository modeloRepository;

    @Autowired
    RecursoRepository recursoRepository;

    public ArrayList<MonitorModel> obtenerDatos_monitor() {
        return (ArrayList<MonitorModel>) repository.findAll();
    }

    public Optional<MonitorModel> obtenerPorId(Long id) {
        return repository.encontrarMonitorId(id);
    }

    @Transactional
    public MonitorModel crearMonitor(MonitorDTO dto, UsuarioModel usuario) {
        TipoModel tipoMonitor;
        tipoMonitor = tipoRepository.findByNombre(("MONITOR"))
                .orElseThrow(() -> new RuntimeException("Tipo Monitor no existe"));

        RecursoModel recurso = new RecursoModel();
        recurso.setTipo(tipoMonitor);
        recurso.setEstado("A");
        recurso.setFecha_creacion(LocalDateTime.now());
        recurso.setUltima_actualizacion_por(usuario);

        MonitorModel monitor = new MonitorModel();
        monitor.setNombre(dto.getNombre());
        monitor.setTag(dto.getTag());
        monitor.setSerial_number(dto.getSerial_number());
        monitor.setModelo(modeloRepository.findById(dto.getId_modelo())
                .orElseThrow(() -> new RuntimeException("Modelo no encontrado")));
        monitor.setRecurso(recurso);

        recursoRepository.save(recurso);
        return repository.save(monitor);
    }

    @Transactional
    public MonitorModel editarMonitor(Long id_monitor, MonitorDTO dto, UsuarioModel usuario) {
        MonitorModel monitor = repository.findById(id_monitor)
                .orElseThrow(() -> new RuntimeException("Monitor no encontrado"));

        if (dto.getNombre() != null)
            monitor.setNombre(dto.getNombre());

        if (dto.getTag() != null)
            monitor.setTag(dto.getTag());

        if (dto.getSerial_number() != null)
            monitor.setSerial_number(dto.getSerial_number());

        if (dto.getId_modelo() != null) {
            ModeloModel modelo = modeloRepository.findById(dto.getId_modelo())
                    .orElseThrow(() -> new RuntimeException("Modelo no encontrado"));
            monitor.setModelo(modelo);
        }

        monitor.getRecurso().setFecha_ultima_actualizacion(LocalDateTime.now());
        monitor.getRecurso().setUltima_actualizacion_por(usuario);

        return repository.save(monitor);
    }

    public MonitorModel guardarDatos_monitor(MonitorModel datos_monitor) {
        return repository.save(datos_monitor);
    }

    public MonitorModel modificarDatos_monitor(MonitorModel datos_monitor) {
        return repository.save(datos_monitor);
    }

    public boolean eliminarDatos_monitor(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
