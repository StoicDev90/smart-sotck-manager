package com.smartstock.dtos;

public class MonitorDTO {
    private Long id_monitor;
    private String nombre;
    private Integer tag;
    private String serial_number;
    private Long id_modelo;

    
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
    public Long getId_modelo() {
        return id_modelo;
    }
    public void setId_modelo(Long id_modelo) {
        this.id_modelo = id_modelo;
    }

    
}
