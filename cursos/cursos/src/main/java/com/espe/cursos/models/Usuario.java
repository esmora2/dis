package com.espe.cursos.models;


import java.util.Date;


public class Usuario {

    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private Date fecha_nacimiento;
    private String creado_en;

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getEmail() {
        return email;
    }

    public String getTelefono() {
        return telefono;
    }

    public Date getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public String getCreado_en() {
        return creado_en;
    }

    //Setters


    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public void setFecha_nacimiento(Date fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    public void setCreado_en(String creado_en) {
        this.creado_en = creado_en;
    }
}
