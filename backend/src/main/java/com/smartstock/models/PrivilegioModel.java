package com.smartstock.models;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "privilegio")
public class PrivilegioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_privilegio;

    @Column
    private String nombre;

    @JsonIgnore
    @ManyToMany(mappedBy = "privilegios")
    private Collection<RolModel> roles;

    public Long getId_privilegio() {
        return id_privilegio;
    }

    public void setId_privilegio(Long id_privilegio) {
        this.id_privilegio = id_privilegio;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Collection<RolModel> getRoles() {
        return roles;
    }

    public void setRoles(Collection<RolModel> roles) {
        this.roles = roles;
    }

}
