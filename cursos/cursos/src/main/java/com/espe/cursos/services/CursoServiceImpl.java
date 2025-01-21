package com.espe.cursos.services;

import com.espe.cursos.clients.UsuarioClientRest;
import com.espe.cursos.models.Usuario;
import com.espe.cursos.models.entities.Curso;
import com.espe.cursos.models.entities.CursoUsuario;
import com.espe.cursos.repositories.CursoRepository;
import com.espe.cursos.repositories.CursoUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CursoServiceImpl implements CursosService {

    @Autowired
    private UsuarioClientRest clientRest;

    @Autowired
    private CursoRepository repository;

    @Autowired
    private CursoUsuarioRepository cursoUsuarioRepository;

    @Override
    public List<Curso> findAll() {
        return (List<Curso>) repository.findAll();
    }

    @Override
    public Optional<Curso> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Curso save(Curso curso) {
        return repository.save(curso);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Usuario> addUser(Usuario usuario, Long cursoId) {
        Optional<Curso> optionalCurso = repository.findById(cursoId);

        if (optionalCurso.isPresent()) {
            Curso curso = optionalCurso.get();

            // Verificar si el estudiante ya está asociado al curso
            boolean exists = curso.getCursoUsuarios().stream()
                    .anyMatch(cursoUsuario -> cursoUsuario.getUsuarioId().equals(usuario.getId()));
            if (exists) {
                throw new IllegalArgumentException("El usuario ya está registrado en el curso.");
            }

            // Consultar usuario desde el microservicio de estudiantes
            Usuario usuarioTemp = clientRest.findById(usuario.getId());

            // Crear y guardar la relación Curso-Usuario
            CursoUsuario cursoUsuario = new CursoUsuario();
            cursoUsuario.setUsuarioId(usuarioTemp.getId());
            cursoUsuario = cursoUsuarioRepository.save(cursoUsuario); // Persistir CursoUsuario

            // Asociar el CursoUsuario al curso
            curso.addCursoUsuario(cursoUsuario);

            // Guardar cambios en el curso
            repository.save(curso);
            return Optional.of(usuarioTemp);
        }
        return Optional.empty();
    }

}
