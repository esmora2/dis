package com.espe.estudiantes.repositories;

import com.espe.estudiantes.models.entities.Estudiante;
import org.springframework.data.repository.CrudRepository;

public interface EstudianteRepository extends CrudRepository<Estudiante, Long> {

}
