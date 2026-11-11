package com.smartstock.dtos;

public class ComputadoraDTO {
    
    private Long id_cpu;
    private String nombre;
    private Integer tag;
    private String serial_number;
    private Long id_modelo;
    private String ip;
    private String sm;
    private String gw;


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
    public Long getId_modelo() {
        return id_modelo;
    }
    public void setId_modelo(Long id_modelo) {
        this.id_modelo = id_modelo;
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
}
