package com.espe.cursos.models.entities;

import com.espe.cursos.models.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "curso_id")
    private List<CursoUsuario> cursoUsuarios;


    @Transient
    private List<Usuario> usuarios;

    public Curso(){
        cursoUsuarios = new ArrayList<>();
        usuarios = new ArrayList<>();
    }

    public void addCursoUsuario(CursoUsuario cursoUsuario){
        cursoUsuarios.add(cursoUsuario);
    }

    public void removeCursoUsuario(CursoUsuario cursoUsuario){
        cursoUsuarios.remove(cursoUsuario);
    }

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

    public List<CursoUsuario> getCursoUsuarios() {
        return cursoUsuarios;
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

    public void setCursoUsuarios(List<CursoUsuario> cursoUsuarios) {
        this.cursoUsuarios = cursoUsuarios;
    }
}
