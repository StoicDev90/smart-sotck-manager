package com.smartstock.dtos;

import java.time.LocalDateTime;

public class AsignacionDTO {
    private Long id_recurso;
    private String login_asignado_a;
    private Long id_ceco;
    private Long id_celo;
    private LocalDateTime fecha_alta;

    public Long getId_recurso() {
        return id_recurso;
    }
    public void setId_recurso(Long id_recurso) {
        this.id_recurso = id_recurso;
    }
    public String getLogin_asignado_a() {
        return login_asignado_a;
    }
    public void setLogin_asignado_a(String login_asignado_a) {
        this.login_asignado_a = login_asignado_a;
    }
    public Long getId_ceco() {
        return id_ceco;
    }
    public void setId_ceco(Long id_ceco) {
        this.id_ceco = id_ceco;
    }
    public Long getId_celo() {
        return id_celo;
    }
    public void setId_celo(Long id_celo) {
        this.id_celo = id_celo;
    }
    public LocalDateTime getFecha_alta() {
        return fecha_alta;
    }
    public void setFecha_alta(LocalDateTime fecha_alta) {
        this.fecha_alta = fecha_alta;
    }
}
