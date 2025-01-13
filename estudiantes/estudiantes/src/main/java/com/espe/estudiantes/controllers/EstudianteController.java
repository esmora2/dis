package com.espe.estudiantes.controllers;

import com.espe.estudiantes.models.entities.Estudiante;
import com.espe.estudiantes.services.EstudiantesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/estudiantes")
public class EstudianteController {

    @Autowired
    private EstudiantesService service;

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Estudiante estudiante ){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(estudiante));
    }

    @GetMapping
    public ResponseEntity<?> listar(){ return ResponseEntity.ok(service.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id){
        Optional<Estudiante> estudianteOptional = service.findById(id);
        if (estudianteOptional.isPresent()){
            return ResponseEntity.ok().body(estudianteOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@RequestBody Estudiante estudiante, @PathVariable Long id){
        Optional<Estudiante> estudianteOptional = service.findById(id);
        if(estudianteOptional.isPresent()){
            Estudiante estudianteDB = estudianteOptional.get();
            estudianteDB.setNombre(estudiante.getNombre());
            estudianteDB.setApellido(estudiante.getApellido());
            estudianteDB.setEmail(estudiante.getEmail());
            estudianteDB.setFecha_nacimiento(estudiante.getFecha_nacimiento());
            estudianteDB.setTelefono(estudiante.getTelefono());
            estudianteDB.setCreado_en(estudiante.getCreado_en());
            return ResponseEntity.status(HttpStatus.CREATED).body(service.save(estudianteDB));
        }
        return ResponseEntity.notFound().build();
    }

    //Eliminar un estudiante por ID

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        Optional<Estudiante> estudiante = service.findById(id);
        if (estudiante.isPresent()){
            service.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Estudiante no encontrado para eliminar");
        }
    }
}
