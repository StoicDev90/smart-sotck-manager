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

import com.smartstock.dtos.LicenciaDTO;
import com.smartstock.models.LicenciaModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.services.AuthService;
import com.smartstock.services.LicenciaService;

@CrossOrigin
@RestController
@RequestMapping("licencia")
public class LicenciaController {

    @Autowired
    LicenciaService service;

    @Autowired
    AuthService authService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public ArrayList<LicenciaModel> obtenerDatos_licencia(@AuthenticationPrincipal UsuarioModel u) {

        if (!authService.puede(u, "LICENCIA", "RECURSO_LEER")) {
            return new ArrayList<>();
        }

        return service.obtenerDatos_licencia();
    }

    @PreAuthorize("@authService.puede(authentication.principal, 'LICENCIA', 'RECURSO_LEER')")
    @GetMapping(path = "/{id}")
    public Optional<LicenciaModel> obtenerPorId(@PathVariable("id") Long id) {
        return service.obtenerPorId(id);
    }

    @PreAuthorize("@authService.puede(authentication.principal, 'LICENCIA', 'RECURSO_CREAR')")
    @PostMapping()
    public LicenciaModel guardarDatos_licencia(@RequestBody LicenciaDTO datos_licencia,
            @AuthenticationPrincipal UsuarioModel u) {
        return service.crearLicencia(datos_licencia, u);
    }

    @PreAuthorize("@authService.puede(authentication.principal, 'LICENCIA', 'RECURSO_EDITAR')")
    @PostMapping("/{id}/editar")
    public LicenciaModel editarLicencia(
            @PathVariable Long id,
            @RequestBody LicenciaDTO dto,
            @AuthenticationPrincipal UsuarioModel usuario) {
        return service.editarLicencia(id, dto, usuario);
    }

    /*
     * @PutMapping()
     * public LicenciaModel modificarDatos_licencia(@RequestBody LicenciaModel
     * datos_licencia_actualizados,
     * 
     * @AuthenticationPrincipal UsuarioModel u) {
     * datos_licencia_actualizados.getRecurso().setUltima_actualizacion_por(u);
     * return service.guardarDatos_licencia(datos_licencia_actualizados);
     * }
     */

    @PreAuthorize("@authService.puede(authentication.principal, 'LICENCIA', 'RECURSO_ELIMINAR')")
    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id) {
        boolean ok = service.eliminarDatos_licencia(id);
        if (ok) {
            return "La licencia con id: " + id + " fue eliminada.";
        } else {
            return "No se pudo eliminar la licencia con id:" + id + ".";
        }
    }
}
