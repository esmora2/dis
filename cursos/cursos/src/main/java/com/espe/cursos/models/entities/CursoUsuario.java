package com.espe.cursos.models.entities;


import jakarta.persistence.*;

@Entity
@Table(name="cursos_usuarios")
public class CursoUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", unique = true)
    private Long usuarioId;

    @ManyToOne
    @JoinColumn(name = "curso_id", nullable = false)
    private Curso curso;


    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
}
