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

import com.smartstock.dtos.ComputadoraDTO;
import com.smartstock.models.ComputadoraModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.services.AuthService;
import com.smartstock.services.ComputadoraService;

@CrossOrigin
@RestController
@RequestMapping("computadora")
public class ComputadoraController {
    
    @Autowired
    ComputadoraService service;

    @Autowired
    AuthService authService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public ArrayList<ComputadoraModel> obtenerDatos_cpu(@AuthenticationPrincipal UsuarioModel u) {

        if (!authService.puede(u, "CPU", "RECURSO_LEER")) {
            return new ArrayList<>();
        }
        
        return service.obtenerDatos_cpu();
    }

    @PreAuthorize("@authService.puede(authentication.principal, 'CPU', 'RECURSO_LEER')")
    @GetMapping(path = "/{id}")
    public Optional<ComputadoraModel> obtenerPorId(@PathVariable("id") Long id) {
        return service.obtenerPorId(id);
    }

    @PreAuthorize("@authService.puede(authentication.principal, 'CPU', 'RECURSO_CREAR')")
    @PostMapping()
    public ComputadoraModel guardarDatos_Cpu(@RequestBody ComputadoraDTO datos_cpu,
            @AuthenticationPrincipal UsuarioModel u) {
        return service.crearComputadora(datos_cpu, u);
    }

    @PreAuthorize("@authService.puede(authentication.principal, 'CPU', 'RECURSO_EDITAR')")
    @PostMapping("/{id}/editar")
    public ComputadoraModel editarComputadora(
            @PathVariable Long id,
            @RequestBody ComputadoraDTO dto,
            @AuthenticationPrincipal UsuarioModel usuario) {
        return service.editarComputadora(id, dto, usuario);
    }
/* 
    @PutMapping()
    public ComputadoraModel modificarDatos_cpu(@RequestBody ComputadoraModel datos_cpu_actualizados, @AuthenticationPrincipal UsuarioModel u) {
        datos_cpu_actualizados.getRecurso().setUltima_actualizacion_por(u);
        return service.guardarDatos_cpu(datos_cpu_actualizados);
    }*/

    @PreAuthorize("@authService.puede(authentication.principal, 'CPU', 'RECURSO_ELIMINAR')")
    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id) {
        boolean ok = service.eliminarDatos_cpu(id);
        if (ok) {
            return "La cpu con id: " + id + " fue eliminada.";
        } else {
            return "No se pudo eliminar la cpu con id:" + id + ".";
        }
    }

}
