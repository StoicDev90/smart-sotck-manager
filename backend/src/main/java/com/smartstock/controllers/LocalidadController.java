package com.smartstock.controllers;

import java.util.ArrayList;

import com.smartstock.services.LocalidadService;
import com.smartstock.models.LocalidadModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/localidad")
public class LocalidadController {
    
    @Autowired
    LocalidadService service;

    @GetMapping()
    public ArrayList<LocalidadModel> obtenerLocalidades() {
        return service.obtenerLocalidades();
    }

    @PreAuthorize("denyAll()")
    @PostMapping()
    public LocalidadModel guardarLocalidad(@RequestBody LocalidadModel localidad) {

        return service.guardarLocalidad(localidad);
    }

    @PreAuthorize("denyAll()")
    @PutMapping()
    public LocalidadModel modificarEquipo(@RequestBody LocalidadModel localidadActualizada) {
        return service.guardarLocalidad(localidadActualizada);
    }

    @PreAuthorize("denyAll()")
    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id) {
        boolean ok = service.eliminarLocalidad(id);
        if (ok) {
            return "La localidad con id: " + id + " fue eliminada.";
        } else {
            return "No se pudo eliminar la localidad con id:" + id + ".";
        }
    }

}
