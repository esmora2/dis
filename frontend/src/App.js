import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cursos, setCursos] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);

  const fetchCursos = async () => {
    try {
      const response = await axios.get('http://cursos:8002/api/cursos');
      setCursos(response.data);
    } catch (error) {
      console.error("Error fetching cursos:", error);
    }
  };
  
  const fetchEstudiantes = async () => {
    try {
      const response = await axios.get('http://estudiantes:8003/api/estudiantes');
      setEstudiantes(response.data);
    } catch (error) {
      console.error("Error fetching estudiantes:", error);
    }
  };
  useEffect(() => {
    fetchCursos();
    fetchEstudiantes();
  }, []);

  return (
    <div>
      <h1>Cursos</h1>
      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>{curso.nombre}</li>
        ))}
      </ul>

      <h1>Estudiantes</h1>
      <ul>
        {estudiantes.map((estudiante) => (
          <li key={estudiante.id}>{estudiante.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;