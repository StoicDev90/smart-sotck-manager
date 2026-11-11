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
@Table(name = "celular")
public class CelularModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_celular;

    @Column(unique = true, nullable = false)
    private String serial_number;

    @ManyToOne(optional = false)
    private ModeloModel modelo;

    @Column(unique = true, nullable = true)
    private String numero_linea;

    @Cascade(CascadeType.ALL)
    @OneToOne(optional = false)
    private RecursoModel recurso;

    public Long getId_celular() {
        return id_celular;
    }

    public void setId_celular(Long id_celular) {
        this.id_celular = id_celular;
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

    public String getNumero_linea() {
        return numero_linea;
    }

    public void setNumero_linea(String numero_linea) {
        this.numero_linea = numero_linea;
    }

    public RecursoModel getRecurso() {
        return recurso;
    }

    public void setRecurso(RecursoModel recurso) {
        this.recurso = recurso;
    }
}
