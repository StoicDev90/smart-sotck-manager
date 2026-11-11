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

import com.smartstock.dtos.CelularDTO;
import com.smartstock.models.CelularModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.services.AuthService;
import com.smartstock.services.CelularService;

@CrossOrigin
@RestController
@RequestMapping("celular")
public class CelularController {

    @Autowired
    CelularService service;

    @Autowired
    AuthService authService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public ArrayList<CelularModel> obtenerDatos_celular(@AuthenticationPrincipal UsuarioModel u) {

        if (!authService.puede(u, "CELULAR", "RECURSO_LEER")) {
            return new ArrayList<>();
        }

        return service.obtenerDatos_celular();
    }

    @PreAuthorize("@authService.puede(authentication.principal, 'CELULAR', 'RECURSO_LEER')")
    @GetMapping(path = "/{id}")
    public Optional<CelularModel> obtenerPorId(@PathVariable("id") Long id) {
        return service.obtenerPorId(id);
    }

    @PreAuthorize("@authService.puede(authentication.principal, 'CELULAR', 'RECURSO_CREAR')")
    @PostMapping()
    public CelularModel guardarDatos_celular(@RequestBody CelularDTO datos_celular,
            @AuthenticationPrincipal UsuarioModel u) {
        return service.crearCelular(datos_celular, u);
    }

    @PreAuthorize("@authService.puede(authentication.principal, 'CELULAR', 'RECURSO_EDITAR')")
    @PostMapping("/{id}/editar")
    public CelularModel editarCelular(
            @PathVariable Long id,
            @RequestBody CelularDTO dto,
            @AuthenticationPrincipal UsuarioModel usuario) {
        return service.editarCelular(id, dto, usuario);
    }

    /*
     * @PutMapping()
     * public CelularModel modificarDatos_celular(@RequestBody CelularModel
     * datos_celular_actualizados,
     * 
     * @AuthenticationPrincipal UsuarioModel u) {
     * datos_celular_actualizados.getRecurso().setUltima_actualizacion_por(u);
     * return service.guardarDatos_celular(datos_celular_actualizados);
     * }
     */

    @PreAuthorize("@authService.puede(authentication.principal, 'CELULAR', 'RECURSO_ELIMINAR')")
    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id) {
        boolean ok = service.eliminarDatos_celular(id);
        if (ok) {
            return "El celular con id: " + id + " fue eliminada.";
        } else {
            return "No se pudo eliminar el celular con id:" + id + ".";
        }
    }
}
