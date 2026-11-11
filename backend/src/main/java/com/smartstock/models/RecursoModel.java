package com.smartstock.models;

import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.*;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "recurso")
public class RecursoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_recurso;

    @ManyToOne(optional = false)
    private TipoModel tipo;

    @Column(unique = false, nullable = false)
    private LocalDateTime fecha_creacion;

    @Column(unique = false, nullable = true)
    private LocalDateTime fecha_ultima_actualizacion;

    @ManyToOne(optional = false)
    private UsuarioModel ultima_actualizacion_por;

    @OneToMany(mappedBy = "recurso")
    private List<RecursoLogModel> logs;

    @Column(unique = false, nullable = true)
    private LocalDateTime fecha_baja;

    @Column(unique = false, nullable = false)
    private String estado;

    @JsonManagedReference
    @Cascade(CascadeType.DELETE)
    @OneToMany(mappedBy = "recurso")
    private List<AsignacionModel> asignaciones;

    @JsonManagedReference
    @Transient
    private AsignacionModel ultima_asignacion;

    public TipoModel getTipo() {
        return tipo;
    }

    public void setTipo(TipoModel tipo) {
        this.tipo = tipo;
    }

    public Long getId_recurso() {
        return id_recurso;
    }

    public void setId_recurso(Long id_recurso) {
        this.id_recurso = id_recurso;
    }

    public LocalDateTime getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(LocalDateTime fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public LocalDateTime getFecha_ultima_actualizacion() {
        return fecha_ultima_actualizacion;
    }

    public void setFecha_ultima_actualizacion(LocalDateTime fecha_ultima_actualizacion) {
        this.fecha_ultima_actualizacion = fecha_ultima_actualizacion;
    }

    public LocalDateTime getFecha_baja() {
        return fecha_baja;
    }

    public void setFecha_baja(LocalDateTime fecha_baja) {
        this.fecha_baja = fecha_baja;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public UsuarioModel getUltima_actualizacion_por() {
        return ultima_actualizacion_por;
    }

    public void setUltima_actualizacion_por(UsuarioModel ultima_actualizacion_por) {
        this.ultima_actualizacion_por = ultima_actualizacion_por;
    }

    public List<AsignacionModel> getAsignaciones() {
        return asignaciones;
    }

    public void setAsignaciones(List<AsignacionModel> asignaciones) {
        this.asignaciones = asignaciones;
    }

    public AsignacionModel getUltima_asignacion() {
        return this.ultima_asignacion;
    }

    public void setUltima_asignacion() {
        if (this.asignaciones.size() == 0)
            this.ultima_asignacion = null;
        AsignacionModel ret = null;
        for (AsignacionModel asignacion : this.asignaciones) {
            if (asignacion.getFecha_baja() == null) {
                ret = asignacion;
            }
        }
        this.ultima_asignacion = ret;
    }

    public List<RecursoLogModel> getLogs() {
        return logs;
    }

    public void setLogs(List<RecursoLogModel> logs) {
        this.logs = logs;
    }

}
