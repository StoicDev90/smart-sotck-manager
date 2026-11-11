package com.smartstock.models;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
@Table(name = "licencia")
public class LicenciaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_licencia;

    @Column(unique = false, nullable = false)
    private String nombre;

    @Column(unique = false, nullable = false)
    private LocalDateTime fecha_desde;

    @Column(unique = false, nullable = true)
    private LocalDateTime fecha_hasta;

    @Cascade(CascadeType.ALL)
    @OneToOne(optional = false)
    private RecursoModel recurso;

    public Long getId_licencia() {
        return id_licencia;
    }

    public void setId_licencia(Long id_licencia) {
        this.id_licencia = id_licencia;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDateTime getFecha_desde() {
        return fecha_desde;
    }

    public void setFecha_desde(LocalDateTime fecha_desde) {
        this.fecha_desde = fecha_desde;
    }

    public LocalDateTime getFecha_hasta() {
        return fecha_hasta;
    }

    public void setFecha_hasta(LocalDateTime fecha_hasta) {
        this.fecha_hasta = fecha_hasta;
    }

    public RecursoModel getRecurso() {
        return recurso;
    }

    public void setRecurso(RecursoModel recurso) {
        this.recurso = recurso;
    }
}
