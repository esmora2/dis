import React, { useState, useEffect } from "react";
import { cursosAPI } from "../api/axios";

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [editandoCurso, setEditandoCurso] = useState(null);
  const [nuevoCurso, setNuevoCurso] = useState({
    nombre: "",
    description: "",
    creditos: 0,
    creado_en: "",
  });

  const [errores, setErrores] = useState({});

  // Obtener todos los cursos
  const obtenerCursos = async () => {
    try {
      const response = await cursosAPI.get("/");
      setCursos(response.data);
    } catch (error) {
      console.error("Error obteniendo cursos:", error);
    }
  };

  // Validar campos del formulario
  const validarFormulario = () => {
    const erroresTemp = {};

    if (!nuevoCurso.nombre.trim()) {
      erroresTemp.nombre = "El nombre del curso es obligatorio.";
    } else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/.test(nuevoCurso.nombre)) {
      erroresTemp.nombre = "El nombre solo puede contener letras, números y espacios.";
    }

    if (!nuevoCurso.description.trim()) {
      erroresTemp.description = "La descripción es obligatoria.";
    }

    if (nuevoCurso.creditos <= 0 || !Number.isInteger(nuevoCurso.creditos)) {
      erroresTemp.creditos = "Los créditos deben ser un número entero positivo.";
    }

    if (!nuevoCurso.creado_en.trim()) {
      erroresTemp.creado_en = "Debe seleccionar una fecha válida.";
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  // Agregar un nuevo curso
  const agregarCurso = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      await cursosAPI.post("/", nuevoCurso);
      obtenerCursos();
      resetFormulario();
    } catch (error) {
      console.error("Error agregando curso:", error);
    }
  };

  // Editar un curso
  const editarCurso = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      await cursosAPI.put(`/${editandoCurso.id}`, editandoCurso);
      obtenerCursos();
      setEditandoCurso(null);
    } catch (error) {
      console.error("Error editando curso:", error);
    }
  };

  // Eliminar un curso
  const eliminarCurso = async (id) => {
    try {
      await cursosAPI.delete(`/${id}`);
      obtenerCursos();
    } catch (error) {
      console.error("Error eliminando curso:", error);
    }
  };

  // Resetear el formulario
  const resetFormulario = () => {
    setNuevoCurso({
      nombre: "",
      description: "",
      creditos: 0,
      creado_en: "",
    });
    setErrores({});
    setEditandoCurso(null);
  };

  useEffect(() => {
    obtenerCursos();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Gestión de Cursos</h2>

      {/* Formulario */}
      <form
        onSubmit={editandoCurso ? editarCurso : agregarCurso}
        style={{
          marginBottom: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {["nombre", "description"].map((campo) => (
          <div style={{ marginBottom: "10px" }} key={campo}>
            <input
              type="text"
              placeholder={campo === "nombre" ? "Nombre del curso" : "Descripción"}
              value={editandoCurso ? editandoCurso[campo] : nuevoCurso[campo]}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
              onChange={(e) =>
                editandoCurso
                  ? setEditandoCurso({ ...editandoCurso, [campo]: e.target.value })
                  : setNuevoCurso({ ...nuevoCurso, [campo]: e.target.value })
              }
            />
            {errores[campo] && <p style={{ color: "red", fontSize: "12px" }}>{errores[campo]}</p>}
          </div>
        ))}

        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            placeholder="Créditos"
            value={editandoCurso ? editandoCurso.creditos : nuevoCurso.creditos}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
            onChange={(e) =>
              editandoCurso
                ? setEditandoCurso({ ...editandoCurso, creditos: parseInt(e.target.value) })
                : setNuevoCurso({ ...nuevoCurso, creditos: parseInt(e.target.value) })
            }
          />
          {errores.creditos && (
            <p style={{ color: "red", fontSize: "12px" }}>{errores.creditos}</p>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="date"
            value={editandoCurso ? editandoCurso.creado_en : nuevoCurso.creado_en}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
            onChange={(e) =>
              editandoCurso
                ? setEditandoCurso({ ...editandoCurso, creado_en: e.target.value })
                : setNuevoCurso({ ...nuevoCurso, creado_en: e.target.value })
            }
          />
          {errores.creado_en && (
            <p style={{ color: "red", fontSize: "12px" }}>{errores.creado_en}</p>
          )}
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button type="submit" style={{ padding: "10px 20px", marginRight: "10px" }}>
            {editandoCurso ? "Guardar Cambios" : "Agregar Curso"}
          </button>
          <button type="button" onClick={resetFormulario} style={{ padding: "10px 20px" }}>
            Resetear
          </button>
        </div>
      </form>

      {/* Tabla */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0", borderBottom: "1px solid #ddd" }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Créditos</th>
            <th>Creado En</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{curso.id}</td>
              <td>{curso.nombre}</td>
              <td>{curso.description}</td>
              <td>{curso.creditos}</td>
              <td>{curso.creado_en}</td>
              <td>
                <button onClick={() => setEditandoCurso(curso)} style={{ marginRight: "5px" }}>
                  Editar
                </button>
                <button onClick={() => eliminarCurso(curso.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cursos;
