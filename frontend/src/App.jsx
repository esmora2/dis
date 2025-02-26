import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Estudiantes from "./components/Estudiantes";
import Cursos from "./components/Cursos";
import RegistrarEstudiante from "./components/RegistrarEstudiante";
import "./App.css";

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/estudiantes">Gestión de Estudiantes</Link>
          </li>
          <li>
            <Link to="/cursos">Gestión de Cursos</Link>
          </li>
          <li>
            <Link to="/registrar-estudiante">Registrar Estudiante en Curso</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<h1>Bienvenido a la Gestión de Estudiantes y Cursos</h1>} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/registrar-estudiante" element={<RegistrarEstudiante />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
