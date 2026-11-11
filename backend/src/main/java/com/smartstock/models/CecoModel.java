package com.smartstock.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Ceco")
public class CecoModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_ceco;

    @Column(unique = true, nullable = false)
    private String codigo_ceco;

    @Column
    private String descripcion;

    @ManyToOne(optional = false)
    private RegionModel region;

    public Long getId() {
        return id_ceco;
    }

    public void setId(Long id) {
        this.id_ceco = id;
    }

    public String getCodigoCeco() {
        return codigo_ceco;
    }

    public void setCodigoCeco(String codigo_ceco) {
        this.codigo_ceco = codigo_ceco;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public RegionModel getRegion() {
        return region;
    }

    public void setRegion(RegionModel region) {
        this.region = region;
    }

}
