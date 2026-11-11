package com.smartstock.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartstock.dtos.MonitorDTO;
import com.smartstock.models.MonitorModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.services.AuthService;
import com.smartstock.services.MonitorService;

@CrossOrigin
@RestController
@RequestMapping("monitor")
public class MonitorController {

    @Autowired
    MonitorService service;

    @Autowired
    AuthService authService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public ArrayList<MonitorModel> obtenerDatos_monitor(@AuthenticationPrincipal UsuarioModel u) {
        if (!authService.puede(u, "MONITOR", "RECURSO_LEER")) {
            return new ArrayList<>();
        }
        
        return service.obtenerDatos_monitor();
    }

    @PreAuthorize("@authService.puede(authentication.principal, 'MONITOR', 'RECURSO_LEER')")
    @GetMapping(path = "/{id}")
    public Optional<MonitorModel> obtenerPorId(@PathVariable("id") Long id) {
        return service.obtenerPorId(id);
    }

    @PreAuthorize("@authService.puede(authentication.principal, 'MONITOR', 'RECURSO_CREAR')")
    @PostMapping()
    public MonitorModel guardarDatos_Monitor(@RequestBody MonitorDTO datos_monitor,
            @AuthenticationPrincipal UsuarioModel u) {
        return service.crearMonitor(datos_monitor, u);
    }

    @PreAuthorize("@authService.puede(authentication.principal, 'MONITOR', 'RECURSO_EDITAR')")
    @PostMapping("/{id}/editar")
    public MonitorModel editarMonitor(
            @PathVariable Long id,
            @RequestBody MonitorDTO dto,
            @AuthenticationPrincipal UsuarioModel usuario) {
        return service.editarMonitor(id, dto, usuario);
    }

    /*
    @PutMapping()
    public MonitorModel modificarDatos_monitor(@RequestBody MonitorModel datos_monitor,
            @AuthenticationPrincipal UsuarioModel u) {
        datos_monitor.getRecurso().setUltima_actualizacion_por(u);
        return service.guardarDatos_monitor(datos_monitor);
    }*/

    @PreAuthorize("@authService.puede(authentication.principal, 'MONITOR', 'RECURSO_ELIMINAR')")
    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id) {
        boolean ok = service.eliminarDatos_monitor(id);
        if (ok) {
            return "Los datos del monitor " + id + " fueron eliminados.";
        } else {
            return "No se pudieron eliminar los datos del monitor.";
        }
    }
}
