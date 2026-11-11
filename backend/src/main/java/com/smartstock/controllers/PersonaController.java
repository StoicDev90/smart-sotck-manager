package com.smartstock.controllers;

import java.util.ArrayList;

import com.smartstock.models.PersonaModel;
import com.smartstock.services.PersonaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/persona")
public class PersonaController {
    
    @Autowired
    PersonaService service;

    @GetMapping()
    public ArrayList<PersonaModel> obtenerPersonas() {
        return service.obtenerPersonas();
    }

    @PreAuthorize("denyAll()")
    @PostMapping()
    public PersonaModel guardarPersona(@RequestBody PersonaModel persona) {
        return service.guardarPersona(persona);
    }

    @PreAuthorize("denyAll()")
    @DeleteMapping(path = "/{login}")
    public String eliminarPorId(@PathVariable("login") String login) {
        boolean ok = service.eliminarPersona(login);
        if (ok) {
            return login + " fue eliminado.";
        } else {
            return login + "no fue eliminado";
        }
    }
}
