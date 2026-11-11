package com.smartstock.controllers;

import java.util.ArrayList;

import com.smartstock.models.RegionModel;
import com.smartstock.services.RegionService;

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
@RequestMapping("/region")
public class RegionController {
    
    @Autowired
    RegionService service;

    @GetMapping()
    public ArrayList<RegionModel> obtenerRegiones() {
        return service.obtenerRegiones();
    }

    @PreAuthorize("denyAll()")
    @PostMapping()
    public RegionModel guardarRegion(@RequestBody RegionModel region) {
        return service.guardarRegion(region);
    }

    @PreAuthorize("denyAll()")
    @PutMapping()
    public RegionModel modificarRegion(@RequestBody RegionModel region) {
        return service.guardarRegion(region);
    }

    @PreAuthorize("denyAll()")
    @DeleteMapping(path = "/{id}")
    public String eliminarRegion(@PathVariable("id") Long id) {
        boolean ok = service.eliminarRegion(id);
        if (ok) {
            return "Region " + id + " eliminada correctamente.";
        } else {
            return "No se pudo eliminar la region" + id + ".";
        }
    }
}
