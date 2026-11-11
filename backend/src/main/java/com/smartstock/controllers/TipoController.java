package com.smartstock.controllers;

import java.util.ArrayList;

import com.smartstock.models.TipoModel;
import com.smartstock.services.TipoService;

import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/tipo")
public class TipoController {
    
    @Autowired
    TipoService service;

    @GetMapping()
    public ArrayList<TipoModel> obtenerTipos() {
        return service.obtenerTipos();
    }

    @PostMapping()
    public TipoModel guardarEquipo(@RequestBody TipoModel tipo) {
        return service.guardarTipo(tipo);
    }

    @PutMapping()
    public TipoModel modificarEquipo(@RequestBody TipoModel tipoModificado) {
        return service.modificarTipo(tipoModificado);
    }

    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id) {
        boolean ok = service.eliminarTipo(id);
        if (ok) {
            return "El tipo con id: " + id + " fue eliminado.";
        } else {
            return "No se pudo eliminar el tipo con id:" + id + ".";
        }
    }
}
