package com.smartstock.services;

import java.util.ArrayList;

import com.smartstock.models.PersonaModel;
import com.smartstock.repositories.PersonaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonaService {
    
    @Autowired
    PersonaRepository repository;

    public ArrayList<PersonaModel> obtenerPersonas() {
        return (ArrayList<PersonaModel>) repository.findAll();
    }

    public PersonaModel guardarPersona(PersonaModel persona) {
        return repository.save(persona);
    }

    public boolean eliminarPersona(String login) {
        try {
            repository.deleteById(login);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
