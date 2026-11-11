package com.smartstock.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "centro_logistico")
public class CentroLogisticoModel {

    @Id
    @Column(unique = true, nullable = false)
    private Long id_celo;

    @Column(unique = true, nullable = false)
    private String codigo;

    @ManyToOne
    private LocalidadModel localidad;

    @Column
    private String nombre;

    public Long getId_celo() {
        return id_celo;
    }

    public void setId_celo(Long id_celo) {
        this.id_celo = id_celo;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalidadModel getLocalidad() {
        return localidad;
    }

    public void setLocalidad(LocalidadModel localidad) {
        this.localidad = localidad;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
