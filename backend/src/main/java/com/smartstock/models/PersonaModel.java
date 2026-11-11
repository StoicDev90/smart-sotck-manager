package com.smartstock.models;

import javax.persistence.*;

@Entity
@Table(name = "persona")
public class PersonaModel {
    
    @Id
    @Column(nullable = false, unique = true)
    private String login;

    private String nombre;

    public String getLogin() {
        return login;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
