package com.smartstock.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartstock.models.CentroLogisticoModel;
import com.smartstock.services.CentroLogisticoService;

@CrossOrigin
@RestController
@RequestMapping("celo")
public class CentroLogisticoController {
    
    @Autowired
    CentroLogisticoService service;

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public ArrayList<CentroLogisticoModel> obtenerCeLos() {
        return service.obtenerCeLos();
    }

    @PreAuthorize("denyAll()")
    @PostMapping()
    public CentroLogisticoModel guardarCeLo(@RequestBody CentroLogisticoModel celo) {
        return service.guardarCeLo(celo);
    }

    @PreAuthorize("denyAll()")
    @PutMapping
    public CentroLogisticoModel modificarCeLo(@RequestBody CentroLogisticoModel celo) {
        return service.guardarCeLo(celo);
    }

    @PreAuthorize("denyAll()")
    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id) {
        boolean ok = service.eliminarCeLo(id);
        if (ok) {
            return "El centro logistico fue eliminado correctamente.";
        } else {
            return "No se pudo eliminar el centro logistico.";
        }
    }

}
