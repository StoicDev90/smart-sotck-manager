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
@Table(name = "computadora")
public class ComputadoraModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_cpu;

    @Column(unique = true, nullable = false)
    private String nombre;

    @Column(unique = false, nullable = true)
    private Integer tag;

    @Column(unique = true, nullable = false)
    private String serial_number;

    @ManyToOne(optional = false)
    private ModeloModel modelo;

    @Column(unique = true, nullable = true)
    private String ip;

    @Column(unique = false, nullable = true)
    private String sm;

    @Column(unique = false, nullable = true)
    private String gw;

    @Cascade(CascadeType.ALL)
    @OneToOne
    private RecursoModel recurso;

    public Long getId_cpu() {
        return id_cpu;
    }

    public void setId_cpu(Long id_cpu) {
        this.id_cpu = id_cpu;
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

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getSm() {
        return sm;
    }

    public void setSm(String sm) {
        this.sm = sm;
    }

    public String getGw() {
        return gw;
    }

    public void setGw(String gw) {
        this.gw = gw;
    }

    public RecursoModel getRecurso() {
        return recurso;
    }

    public void setRecurso(RecursoModel recurso) {
        this.recurso = recurso;
    }
}
