package com.espe.cursos.controllers;

import com.espe.cursos.models.entities.Curso;
import com.espe.cursos.services.CursosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/cursos")
public class CursoController {

    @Autowired
    private CursosService service;

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Curso curso ){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(curso));
    }

    @GetMapping
    public ResponseEntity<?> listar(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id){
        Optional<Curso> cursoOptional = service.findById(id);
        if (cursoOptional.isPresent()){
            return ResponseEntity.ok().body(cursoOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@RequestBody Curso curso, @PathVariable Long id){
        Optional<Curso> cursoOptional = service.findById(id);
        if(cursoOptional.isPresent()){
            Curso cursoDB = cursoOptional.get();
            cursoDB.setNombre(curso.getNombre());
            cursoDB.setDescription(curso.getDescription());
            cursoDB.setCreditos(curso.getCreditos());
            cursoDB.setCreado_en(curso.getCreado_en());
            return ResponseEntity.status(HttpStatus.CREATED).body(service.save(cursoDB));
        }
        return ResponseEntity.notFound().build();
    }

    // Eliminar un curso por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<Curso> curso = service.findById(id);
        if (curso.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso no encontrado para eliminar");
        }
    }
}
