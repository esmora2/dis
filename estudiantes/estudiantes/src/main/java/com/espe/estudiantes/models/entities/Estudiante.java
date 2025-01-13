package com.espe.estudiantes.models.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="Estudiantes")

public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column (nullable = false)
    private String nombre;
    @Column (nullable = false)
    private String apellido;
    @Column (nullable = false)
    private String email;
    @Column (nullable = false)
    private Date fecha_nacimiento;
    @Column (nullable = false)
    private String telefono;
    @Column (nullable = false)
    private String creado_en;


    //get


    public long getId() {
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

    public Date getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public String getTelefono() {
        return telefono;
    }

    public String getCreado_en() {
        return creado_en;
    }


    //set


    public void setId(long id) {
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

    public void setFecha_nacimiento(Date fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public void setCreado_en(String creado_en) {
        this.creado_en = creado_en;
    }
}
