package com.smartstock.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
@Table(name = "monitor")
public class MonitorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_monitor;

    @Column(unique = true, nullable = false)
    private String nombre;

    @Column(unique = true, nullable = true)
    private Integer tag;

    @Column(unique = true, nullable = false)
    private String serial_number;

    @ManyToOne(optional = false)
    private ModeloModel modelo;

    @Cascade(CascadeType.ALL)
    @OneToOne
    private RecursoModel recurso;

    public Long getId_monitor() {
        return id_monitor;
    }

    public void setId_monitor(Long id_monitor) {
        this.id_monitor = id_monitor;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getTag() {
        return tag;
    }

    public void setTag(Integer tag) {
        this.tag = tag;
    }

    public String getSerial_number() {
        return serial_number;
    }

    public void setSerial_number(String serial_number) {
        this.serial_number = serial_number;
    }

    public ModeloModel getModelo() {
        return modelo;
    }

    public void setModelo(ModeloModel modelo) {
        this.modelo = modelo;
    }

    public RecursoModel getRecurso() {
        return recurso;
    }

    public void setRecurso(RecursoModel recurso) {
        this.recurso = recurso;
    }
}
