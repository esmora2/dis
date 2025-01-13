package com.espe.cursos.models.entities;

import jakarta.persistence.*;

@Entity
@Table(name="Cursos")

public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column (nullable = false)
    private String nombre;
    @Column (nullable = false)
    private String description;
    @Column (nullable = false)
    private int creditos;
    @Column (nullable = false)
    private String creado_en;

    //get

    public long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescription() {
        return description;
    }

    public int getCreditos() {
        return creditos;
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

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreditos(int creditos) {
        this.creditos = creditos;
    }

    public void setCreado_en(String creado_en) {
        this.creado_en = creado_en;
    }
}
