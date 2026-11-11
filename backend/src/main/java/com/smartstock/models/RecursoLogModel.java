package com.smartstock.models;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "recurso_log")
public class RecursoLogModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_recurso_log")
    private Long idRecursoLog;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_recurso")
    @JsonIgnore
    private RecursoModel recurso;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_usuario")
    private UsuarioModel usuario;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @Column(name = "tipo_evento", nullable = false)
    private String tipoEvento;

    @Column(nullable = false)
    private String motivo;

    public Long getIdRecursoLog() {
        return idRecursoLog;
    }

    public void setIdRecursoLog(Long idRecursoLog) {
        this.idRecursoLog = idRecursoLog;
    }

    public RecursoModel getRecurso() {
        return recurso;
    }

    public void setRecurso(RecursoModel recurso) {
        this.recurso = recurso;
    }

    public UsuarioModel getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioModel usuario) {
        this.usuario = usuario;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(String tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }


    
}
