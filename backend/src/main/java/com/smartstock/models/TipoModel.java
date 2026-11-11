package com.smartstock.models;

import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tipo")
public class TipoModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nombre;

    @JsonIgnore
    @ManyToMany(mappedBy = "tipos")
    private Set<RolModel> roles;

    @JsonIgnore
    @ManyToMany(mappedBy = "tipos")
    private Set<MarcaModel> marcas;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<RolModel> getRoles() {
        return roles;
    }

    public void setRoles(Set<RolModel> roles) {
        this.roles = roles;
    }

    public Set<MarcaModel> getMarcas() {
        return marcas;
    }

    public void setMarcas(Set<MarcaModel> marcas) {
        this.marcas = marcas;
    }
}
