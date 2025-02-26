import React, { useState, useEffect } from "react";
import { registrosAPI } from "../api/axios";

const RegistrarEstudiante = () => {
  const [cursoId, setCursoId] = useState("");
  const [estudianteId, setEstudianteId] = useState("");
  const [registros, setRegistros] = useState([]);
  const [editandoRegistro, setEditandoRegistro] = useState(null);

  // Obtener los registros de cursos_usuarios
  const obtenerRegistros = async () => {
    try {
      const response = await registrosAPI.get("/");
      setRegistros(response.data);
    } catch (error) {
      console.error("Error obteniendo registros:", error);
    }
  };

  // Registrar estudiante en un curso
  const registrarEstudiante = async (e) => {
    e.preventDefault();
    try {
      await registrosAPI.post(`/${cursoId}/estudiantes`, { id: estudianteId });
      alert("Estudiante registrado con éxito en el curso");
      obtenerRegistros();
      setCursoId("");
      setEstudianteId("");
    } catch (error) {
      console.error("Error registrando estudiante:", error);
    }
  };

  // Editar un registro
  const editarRegistro = async (e) => {
    e.preventDefault();
    try {
      await registrosAPI.put(`/${editandoRegistro.id}`, {
        curso_id: editandoRegistro.curso_id,
        usuario_id: editandoRegistro.usuario_id,
      });
      alert("Registro actualizado con éxito");
      obtenerRegistros();
      setEditandoRegistro(null); // Salir del modo edición
    } catch (error) {
      console.error("Error editando registro:", error);
    }
  };

  // Eliminar un registro
  const eliminarRegistro = async (id) => {
    try {
      await registrosAPI.delete(`/${id}`);
      alert("Registro eliminado con éxito");
      obtenerRegistros();
    } catch (error) {
      console.error("Error eliminando registro:", error);
    }
  };

  useEffect(() => {
    obtenerRegistros();
  }, []);

  return (
    <div>
      <h2>Registrar Estudiante en Curso</h2>
      <form onSubmit={editandoRegistro ? editarRegistro : registrarEstudiante}>
        <input
          type="text"
          placeholder="ID del Curso"
          value={editandoRegistro ? editandoRegistro.curso_id : cursoId}
          onChange={(e) =>
            editandoRegistro
              ? setEditandoRegistro({ ...editandoRegistro, curso_id: e.target.value })
              : setCursoId(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="ID del Estudiante"
          value={editandoRegistro ? editandoRegistro.usuario_id : estudianteId}
          onChange={(e) =>
            editandoRegistro
              ? setEditandoRegistro({ ...editandoRegistro, usuario_id: e.target.value })
              : setEstudianteId(e.target.value)
          }
        />
        <button type="submit">{editandoRegistro ? "Guardar Cambios" : "Registrar"}</button>
      </form>

      <h3>Registros de cursos y estudiantes</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Usuario</th>
            <th>ID Curso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.length > 0 ? (
            registros.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.id}</td>
                <td>{registro.usuario_id}</td>
                <td>{registro.curso_id}</td>
                <td>
                  <button onClick={() => setEditandoRegistro(registro)}>Editar</button>
                  <button onClick={() => eliminarRegistro(registro.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay registros disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrarEstudiante;