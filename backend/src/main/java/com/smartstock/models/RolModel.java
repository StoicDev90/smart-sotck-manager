package com.smartstock.models;

import java.util.Collection;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "rol")
public class RolModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_rol;

    @ManyToMany(mappedBy = "roles")
    private Collection<UsuarioModel> usuarios;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "privilegio_roles", joinColumns = @JoinColumn(name = "id_rol", referencedColumnName = "id_rol"), inverseJoinColumns = @JoinColumn(name = "id_privilegio", referencedColumnName = "id_privilegio"))
    private Set<PrivilegioModel> privilegios;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "rol_tipo",
        joinColumns = @JoinColumn(name = "id_rol"),
        inverseJoinColumns = @JoinColumn(name = "id_tipo")
    )
    private Set<TipoModel> tipos;

    @Column
    private String nombre;

    public Long getId_rol() {
        return id_rol;
    }

    public void setId_rol(Long id_rol) {
        this.id_rol = id_rol;
    }

    @JsonIgnore
    public Collection<UsuarioModel> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Collection<UsuarioModel> usuarios) {
        this.usuarios = usuarios;
    }

    public Set<PrivilegioModel> getPrivileges() {
        return privilegios;
    }

    public void setPrivileges(Set<PrivilegioModel> privileges) {
        this.privilegios = privileges;
    }

    public Set<TipoModel> getTipos() {
        return this.tipos;
    }

    public void setTipos(Set<TipoModel> tipos) {
        this.tipos = tipos;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
