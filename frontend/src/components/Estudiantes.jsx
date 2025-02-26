import React, { useState, useEffect } from "react";
import { estudiantesAPI } from "../api/axios";

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [editandoEstudiante, setEditandoEstudiante] = useState(null);
  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fecha_nacimiento: "",
    telefono: "",
    creado_en: "",
  });

  const [errores, setErrores] = useState({});

  // Obtener todos los estudiantes
  const obtenerEstudiantes = async () => {
    try {
      const response = await estudiantesAPI.get("/");
      setEstudiantes(response.data);
    } catch (error) {
      console.error("Error obteniendo estudiantes:", error);
    }
  };

  // Validar campos del formulario
  const validarFormulario = () => {
    const erroresTemp = {};

    if (!nuevoEstudiante.nombre.trim()) {
      erroresTemp.nombre = "El nombre es obligatorio.";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nuevoEstudiante.nombre)) {
      erroresTemp.nombre = "El nombre solo puede contener letras y espacios.";
    }

    if (!nuevoEstudiante.apellido.trim()) {
      erroresTemp.apellido = "El apellido es obligatorio.";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nuevoEstudiante.apellido)) {
      erroresTemp.apellido = "El apellido solo puede contener letras y espacios.";
    }

    if (!nuevoEstudiante.email.trim()) {
      erroresTemp.email = "El correo electrónico es obligatorio.";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(nuevoEstudiante.email)) {
      erroresTemp.email = "El correo electrónico no tiene un formato válido.";
    }

    if (!nuevoEstudiante.fecha_nacimiento) {
      erroresTemp.fecha_nacimiento = "La fecha de nacimiento es obligatoria.";
    } else {
      const hoy = new Date();
      const nacimiento = new Date(nuevoEstudiante.fecha_nacimiento);
      if (nacimiento >= hoy) {
        erroresTemp.fecha_nacimiento = "La fecha debe ser anterior a la fecha actual.";
      }
    }

    if (!nuevoEstudiante.telefono.trim()) {
      erroresTemp.telefono = "El teléfono es obligatorio.";
    } else if (!/^\d{9,12}$/.test(nuevoEstudiante.telefono)) {
      erroresTemp.telefono = "El teléfono debe tener entre 9 y 12 dígitos.";
    }

    if (!nuevoEstudiante.creado_en.trim()) {
      erroresTemp.creado_en = "Debe seleccionar un mes válido.";
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const agregarEstudiante = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      await estudiantesAPI.post("/", nuevoEstudiante);
      obtenerEstudiantes();
      resetFormulario();
    } catch (error) {
      console.error("Error agregando estudiante:", error);
    }
  };

  const editarEstudiante = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      await estudiantesAPI.put(`/${editandoEstudiante.id}`, editandoEstudiante);
      obtenerEstudiantes();
      setEditandoEstudiante(null);
    } catch (error) {
      console.error("Error editando estudiante:", error);
    }
  };

  const eliminarEstudiante = async (id) => {
    try {
      await estudiantesAPI.delete(`/${id}`);
      obtenerEstudiantes();
    } catch (error) {
      console.error("Error eliminando estudiante:", error);
    }
  };

  const resetFormulario = () => {
    setNuevoEstudiante({
      nombre: "",
      apellido: "",
      email: "",
      fecha_nacimiento: "",
      telefono: "",
      creado_en: "",
    });
    setErrores({});
    setEditandoEstudiante(null);
  };

  useEffect(() => {
    obtenerEstudiantes();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Gestión de Estudiantes</h2>

      {/* Formulario */}
      <form
        onSubmit={editandoEstudiante ? editarEstudiante : agregarEstudiante}
        style={{
          marginBottom: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {["nombre", "apellido", "email", "telefono"].map((campo) => (
          <div style={{ marginBottom: "10px" }} key={campo}>
            <input
              type={campo === "email" ? "email" : "text"}
              placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
              value={editandoEstudiante ? editandoEstudiante[campo] : nuevoEstudiante[campo]}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
              onChange={(e) =>
                editandoEstudiante
                  ? setEditandoEstudiante({ ...editandoEstudiante, [campo]: e.target.value })
                  : setNuevoEstudiante({ ...nuevoEstudiante, [campo]: e.target.value })
              }
            />
            {errores[campo] && <p style={{ color: "red", fontSize: "12px" }}>{errores[campo]}</p>}
          </div>
        ))}

        <div style={{ marginBottom: "10px" }}>
          <input
            type="date"
            value={editandoEstudiante ? editandoEstudiante.fecha_nacimiento : nuevoEstudiante.fecha_nacimiento}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
            onChange={(e) =>
              editandoEstudiante
                ? setEditandoEstudiante({ ...editandoEstudiante, fecha_nacimiento: e.target.value })
                : setNuevoEstudiante({ ...nuevoEstudiante, fecha_nacimiento: e.target.value })
            }
          />
          {errores.fecha_nacimiento && (
            <p style={{ color: "red", fontSize: "12px" }}>{errores.fecha_nacimiento}</p>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <select
            value={editandoEstudiante ? editandoEstudiante.creado_en : nuevoEstudiante.creado_en}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
            onChange={(e) =>
              editandoEstudiante
                ? setEditandoEstudiante({ ...editandoEstudiante, creado_en: e.target.value })
                : setNuevoEstudiante({ ...nuevoEstudiante, creado_en: e.target.value })
            }
          >
            <option value="">Seleccione un mes</option>
            {[
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre",
            ].map((mes) => (
              <option key={mes} value={mes}>
                {mes}
              </option>
            ))}
          </select>
          {errores.creado_en && (
            <p style={{ color: "red", fontSize: "12px" }}>{errores.creado_en}</p>
          )}
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button type="submit" style={{ padding: "10px 20px", marginRight: "10px" }}>
            {editandoEstudiante ? "Guardar Cambios" : "Agregar Estudiante"}
          </button>
          <button type="button" onClick={resetFormulario} style={{ padding: "10px 20px" }}>
            Resetear
          </button>
        </div>
      </form>

      {/* Tabla */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0", borderBottom: "1px solid #ddd" }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Fecha de Nacimiento</th>
            <th>Teléfono</th>
            <th>Creado En</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{estudiante.id}</td>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.apellido}</td>
              <td>{estudiante.email}</td>
              <td>{estudiante.fecha_nacimiento}</td>
              <td>{estudiante.telefono}</td>
              <td>{estudiante.creado_en}</td>
              <td>
                <button onClick={() => setEditandoEstudiante(estudiante)} style={{ marginRight: "5px" }}>
                  Editar
                </button>
                <button onClick={() => eliminarEstudiante(estudiante.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Estudiantes;
