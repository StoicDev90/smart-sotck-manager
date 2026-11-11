package com.smartstock.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.smartstock.services.RecursoService;
import com.smartstock.dtos.MotivoRequestDTO;
import com.smartstock.models.RecursoModel;
import com.smartstock.models.UsuarioModel;

@CrossOrigin
@RestController
@RequestMapping("/recurso")
public class RecursoController {
    
    @Autowired
    RecursoService service;

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public ArrayList<RecursoModel> obtenerRecursos() {
        return service.obtenerRecursos();
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping()
    public RecursoModel guardarRecurso(@RequestBody RecursoModel recurso) {
        return service.guardarRecurso(recurso);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping()
    public RecursoModel modificarRecurso(@RequestBody RecursoModel recursoActualizado) {
        return service.modificarRecurso(recursoActualizado);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id) {
        boolean ok = service.eliminarRecurso(id);
        if (ok) {
            return "El recurso con id: " + id + " fue eliminado.";
        } else {
            return "No se pudo eliminar al recurso con id:" + id + ".";
        }
    }

    @PostMapping(path = "/{id}/baja")
    public void darDeBaja(@PathVariable("id") Long id, @AuthenticationPrincipal UsuarioModel usuario, @RequestBody MotivoRequestDTO motivo) {
        service.darDeBaja(id, usuario, motivo.getMotivo());
    }

    @PostMapping(path = "/{id}/alta")
    public void darDeAlta(@PathVariable("id") Long id, @AuthenticationPrincipal UsuarioModel usuario, @RequestBody MotivoRequestDTO motivo) {
        service.darDeAlta(id, usuario, motivo.getMotivo());
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(path = "/{id}")
    public Optional<RecursoModel> obtenerPorId(@PathVariable("id") Long id) {
        return service.obtenerPorId(id);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(path = "/tipo/{id}")
    public List<RecursoModel> obtenerPorTipo(@PathVariable("id") Long id) {
        return service.obtenerPorTipo(id);
    }
}
