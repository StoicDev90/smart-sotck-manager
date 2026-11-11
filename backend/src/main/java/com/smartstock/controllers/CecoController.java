package com.smartstock.controllers;

import java.util.ArrayList;

import com.smartstock.services.CecoService;
import com.smartstock.models.CecoModel;

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

@CrossOrigin
@RestController
@RequestMapping("/sector")
public class CecoController {
    
    @Autowired
    CecoService service;


    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ArrayList<CecoModel> obtenerSectores() {
        return service.obtenerSectores();
    }

    @PreAuthorize("denyAll()")
    @PostMapping
    public CecoModel guardarSector(@RequestBody CecoModel sector) {
        return service.guardarSector(sector);
    }

    @PreAuthorize("denyAll()")
    @PutMapping
    public CecoModel modificarSector(@RequestBody CecoModel sector) {
        return service.modificarSector(sector);
    }

    @PreAuthorize("denyAll()")
    @DeleteMapping(path = "/{id}")
    public String eliminarSector(@PathVariable("id") Long id) {
        boolean ok = service.eliminarSector(id);

        if (ok) {
            return ("Sector eliminado correctamente");
        } else {
            return ("El sector no se pudo eliminar.");
        }
    }
}
