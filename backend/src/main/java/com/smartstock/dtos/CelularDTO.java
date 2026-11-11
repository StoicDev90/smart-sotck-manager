package com.smartstock.dtos;

public class CelularDTO {
    private Long id_celular;
    private String serial_number;
    private Long id_modelo;
    private String numero_linea;
    
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
    public Long getId_modelo() {
        return id_modelo;
    }
    public void setId_modelo(Long id_modelo) {
        this.id_modelo = id_modelo;
    }
    public String getNumero_linea() {
        return numero_linea;
    }
    public void setNumero_linea(String numero_linea) {
        this.numero_linea = numero_linea;
    }
}
