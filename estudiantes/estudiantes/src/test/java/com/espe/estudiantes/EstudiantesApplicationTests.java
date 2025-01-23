package com.espe.estudiantes;

import com.espe.estudiantes.models.entities.Estudiante;
import com.espe.estudiantes.services.EstudiantesService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class EstudiantesApplicationTests {

	@Mock
	private EstudiantesService estudiantesService;

	@InjectMocks
	private EstudiantesApplicationTests applicationTests;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void testGuardarEstudiante() {
		// Crear un estudiante simulado
		Estudiante estudiante = new Estudiante();
		estudiante.setId(1L);
		estudiante.setNombre("Juan");
		estudiante.setApellido("Pérez");
		estudiante.setEmail("juan.perez@example.com");

		// Configurar el comportamiento del mock
		when(estudiantesService.save(estudiante)).thenReturn(estudiante);

		// Llamar al método y verificar resultados
		Estudiante resultado = estudiantesService.save(estudiante);
		assertEquals("Juan", resultado.getNombre());
		assertEquals("Pérez", resultado.getApellido());

		// Verificar interacciones
		verify(estudiantesService, times(1)).save(estudiante);
	}

	@Test
	public void testBuscarEstudiantePorId() {
		// Crear un estudiante simulado
		Estudiante estudiante = new Estudiante();
		estudiante.setId(1L);
		estudiante.setNombre("Ana");

		// Configurar el comportamiento del mock
		when(estudiantesService.findById(1L)).thenReturn(Optional.of(estudiante));

		// Llamar al método y verificar resultados
		Optional<Estudiante> resultado = estudiantesService.findById(1L);
		assertEquals(true, resultado.isPresent());
		assertEquals("Ana", resultado.get().getNombre());

		// Verificar interacciones
		verify(estudiantesService, times(1)).findById(1L);
	}
}
