package com.smartstock.models;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "asignacion")
public class AsignacionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "id_recurso", nullable = false)
    private RecursoModel recurso;

    @Column(unique = false, nullable = false)
    private LocalDateTime fecha_alta;

    @Column(unique = false, nullable = true)
    private LocalDateTime fecha_baja;

    @ManyToOne(optional = false)
    private PersonaModel asignado_a;

    @ManyToOne(optional = false)
    private UsuarioModel asignado_por;

    @ManyToOne(optional = false)
    private CecoModel ceco;

    @ManyToOne()
    private CentroLogisticoModel celo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RecursoModel getRecurso() {
        return recurso;
    }

    public void setEquipo(RecursoModel recurso) {
        this.recurso = recurso;
    }

    public LocalDateTime getFecha_alta() {
        return fecha_alta;
    }

    public void setFecha_alta(LocalDateTime fecha_alta) {
        this.fecha_alta = fecha_alta;
    }

    public LocalDateTime getFecha_baja() {
        return fecha_baja;
    }

    public void setFecha_baja(LocalDateTime fecha_baja) {
        this.fecha_baja = fecha_baja;
    }

    public PersonaModel getAsignado_a() {
        return asignado_a;
    }

    public void setAsignado_a(PersonaModel asignado_a) {
        this.asignado_a = asignado_a;
    }

    public UsuarioModel getAsignado_por() {
        return asignado_por;
    }

    public void setAsignado_por(UsuarioModel asignado_por) {
        this.asignado_por = asignado_por;
    }

    public CecoModel getCeco() {
        return ceco;
    }

    public void setCeco(CecoModel ceco) {
        this.ceco = ceco;
    }

    public CentroLogisticoModel getCelo() {
        return this.celo;
    }

    public void setCelo(CentroLogisticoModel celo) {
        this.celo = celo;
    }

}
