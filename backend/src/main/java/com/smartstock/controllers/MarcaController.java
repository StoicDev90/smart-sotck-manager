package com.smartstock.controllers;

import java.util.ArrayList;
import java.util.Optional;

import com.smartstock.models.MarcaModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.security.Privileges;
import com.smartstock.services.AuthService;
import com.smartstock.services.MarcaService;

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
@RequestMapping("/marca")
public class MarcaController {
    
    @Autowired
    MarcaService service;

    @Autowired
    AuthService authService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ArrayList<MarcaModel> obtenerMarcas(@AuthenticationPrincipal UsuarioModel u) {
        if (!authService.tienePermiso(u, Privileges.MARCA_LEER)) {
            return new ArrayList<>();
        }
        return service.obtenerMarcas();
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).MARCA_CREAR)")
    @CrossOrigin
    @PostMapping
    public MarcaModel guardarMarca(@RequestBody MarcaModel marca) {
        return service.guardarMarca(marca);
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).MARCA_EDITAR)")
    @PutMapping
    public MarcaModel modificarMarca(@RequestBody MarcaModel marca) {
        return service.modificarMarca(marca);
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).MARCA_ELIMINAR)")
    @DeleteMapping(path = "/{id}")
    public String eliminarMarca(@PathVariable("id") Long id) {
        boolean ok = service.eliminarMarca(id);

        if (ok) {
            return ("La marca fue eliminada correctamente.");
        } else {
            return ("No se pudo eliminar la marca.");
        }
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(path="/{id}")
    public Optional<MarcaModel> obtenerPorId(@PathVariable("id") Long id){
        return service.obtenerPorId(id);
    }
}
