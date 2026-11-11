package com.smartstock.controllers;

import java.util.ArrayList;
import java.util.Optional;

import com.smartstock.dtos.AsignacionDTO;
import com.smartstock.models.AsignacionModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.services.AsignacionService;

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

@CrossOrigin
@RestController
@RequestMapping("/asignacion")
public class AsignacionController {
    
    @Autowired
    AsignacionService service;

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public ArrayList<AsignacionModel> obtenerAsignaciones() {
        return service.obtenerAsignaciones();
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).RECURSO_ASIGNAR)")
    @PostMapping()
    public AsignacionModel guardarAsignacion(@RequestBody AsignacionDTO dto, @AuthenticationPrincipal UsuarioModel u) {
        return service.guardarAsignacion(dto, u);
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).RECURSO_DESASIGNAR)")
    @PostMapping(path = "/{id}/baja")
    public AsignacionModel bajaAsignacion (@PathVariable("id") Long id, @AuthenticationPrincipal UsuarioModel u) {
        return service.bajaAsignacion(id, u);
    }

    @PreAuthorize("denyAll()")
    @PutMapping()
    public AsignacionModel modificarAsignacion(@RequestBody AsignacionDTO asignacionModificada, @AuthenticationPrincipal UsuarioModel u) {
        return service.guardarAsignacion(asignacionModificada, u);
    }

    @PreAuthorize("denyAll()")
    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id) {
        boolean ok = service.eliminarAsignacion(id);
        if (ok) {
            return "La asignacion con id: " + id + " fue eliminada.";
        } else {
            return "No se pudo eliminar la asignacion con id:" + id + ".";
        }
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).RECURSO_ASIGNAR)")
    @GetMapping(path = "/{id}")
    public Optional<AsignacionModel> obtenerPorId(@PathVariable("id") Long id) {
        return service.obtenerPorId(id);
    }


}
