import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import EmpleadoForm from "./formularioEmpleados";
import "./gestionEmpleados.css";
import {
  type EmpleadoDetalle,
  ListaEmpleados,
} from "../../Controllers/EmpleadoController";

import {type Empleado} from "../../entities/Empleado";

export default function GestionEmpleados() {

  const [Empleados, setEmpleados] = useState<EmpleadoDetalle[]>([]);
useEffect(() => {
  ListaEmpleados().then(setEmpleados);
}, []);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const guardarEmpleado = (nuevoEmpleado: Omit<Empleado, "IdEmpleado">) => {
    console.log(nuevoEmpleado)
    setMostrarFormulario(false);
  };

  return (
    <div className="empleados-container">
      {/* Encabezado */}
      <header className="empleados-header">
        <div>
          <span className="empleados-subtitle">SISTEMA DE CITAS</span>

          <h1>Gestión de Empleados</h1>

          <p>
            Consulta y administra la información de los empleados registrados en
            el sistema.
          </p>
        </div>

        <Link to="/" className="btn-volver">
          ← Volver al inicio
        </Link>
      </header>

      {/* Acciones */}
      <section className="empleados-actions">
        <h2>Empleados registrados</h2>

        <button
          className="btn-nuevo-empleado"
          onClick={() => setMostrarFormulario(true)}
        >
          + Nuevo Empleado
        </button>
      </section>

      {/* Tabla */}
      <section className="empleados-table-container">
        <table className="empleados-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Sexo</th>
              <th>Teléfono</th>
              <th>Estado Civil</th>
              <th>Cargo</th>
              <th>Direccion</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {Empleados.map((empleado) => (
              <tr key={empleado.IdEmpleado}>
                <td>{empleado.IdEmpleado}</td>

                <td>{empleado.Nombre}</td>

                <td>{empleado.Apellido}</td>

                <td>{empleado.Sexo}</td>

                <td>{empleado.Telefono}</td>

                <td>{empleado.EstadoCivil}</td>

                <td>{empleado.Rol}</td>

                <td>{empleado.Direccion}</td>

                <td>
                  <span
                    className={
                      empleado.Estado === "Activo"
                        ? "estado-activo"
                        : "estado-inactivo"
                    }
                  >
                    {empleado.Estado}
                  </span>
                </td>

                <td>
                  <button className="btn-editar">Editar</button>

                  <button className="btn-eliminar">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal */}
      {mostrarFormulario && (
        <EmpleadoForm
          onGuardar={guardarEmpleado}
          onCancelar={() => setMostrarFormulario(false)}
        />
      )}
    </div>
  );
}
