package com.espe.cursos.services;

import com.espe.cursos.models.entities.Curso;

import java.util.List;
import java.util.Optional;

public interface CursosService {

    List<Curso> findAll();
    Optional<Curso> findById(Long id);
    Curso save(Curso curso);
    void deleteById(Long id);
}
