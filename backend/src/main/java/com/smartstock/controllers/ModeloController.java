package com.smartstock.controllers;

import java.util.ArrayList;

import com.smartstock.models.ModeloModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.security.Privileges;
import com.smartstock.services.AuthService;
import com.smartstock.services.ModeloService;

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
@RequestMapping("/modelo")
public class ModeloController {
    
    @Autowired
    ModeloService service;

    @Autowired
    AuthService authService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ArrayList<ModeloModel> obtenerModelos(@AuthenticationPrincipal UsuarioModel u) {
       if (!authService.tienePermiso(u, Privileges.MARCA_LEER)) {
        return new ArrayList<>();
       }

        return service.obtenerModelos();
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).MODELO_CREAR)")
    @PostMapping
    public ModeloModel guardarModelo(@RequestBody ModeloModel modelo) {
        return service.guardarModelo(modelo);
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).MODELO_EDITAR)")
    @PutMapping
    public ModeloModel modificarModelo(@RequestBody ModeloModel modelo) {
        return service.guardarModelo(modelo);
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).MODELO_ELIMINAR)")
    @DeleteMapping(path = "/{id}")
    public String eliminarModelo(@PathVariable("id") Long id) {
        boolean ok = service.eliminarModelo(id);

        if (ok) {
            return ("El modelo fue eliminado");
        } else {
            return ("No se pudo eliminar el modelo");
        }
    }
}
