package com.smartstock.dtos;

import java.time.LocalDateTime;

public class LicenciaDTO {
    private Long id_licencia;
    private String nombre;
    private LocalDateTime fecha_desde;
    private LocalDateTime fecha_hasta;

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
}
