import { Link } from "react-router-dom";
import { useState } from "react";
import EmpleadoForm from "./formularioEmpleados";
import "./gestionEmpleados.css";

interface Empleado {
  IdEmpleado: number;
  Nombre: string;
  Apellido: string;
  Sexo: string;
  Nacionalidad: string;
  FechaNacimiento: string;
  Telefono: string;
  Direccion: string;
  Email: string;
  Cargo: string;
  FechaIngreso: string;
  Estado: string;
}

const empleadosIniciales: Empleado[] = [
  {
    IdEmpleado: 1,
    Nombre: "Laura",
    Apellido: "Gómez",
    Sexo: "Femenino",
    Nacionalidad: "Dominicana",
    FechaNacimiento: "1993-04-15",
    Telefono: "809-555-1234",
    Direccion: "Santo Domingo",
    Email: "laura.gomez@gmail.com",
    Cargo: "Recepcionista",
    FechaIngreso: "2024-01-10",
    Estado: "Activo",
  },
  {
    IdEmpleado: 2,
    Nombre: "José",
    Apellido: "Martínez",
    Sexo: "Masculino",
    Nacionalidad: "Dominicana",
    FechaNacimiento: "1990-09-22",
    Telefono: "809-555-5678",
    Direccion: "Santo Domingo",
    Email: "jose.martinez@gmail.com",
    Cargo: "Estilista",
    FechaIngreso: "2023-08-05",
    Estado: "Activo",
  },
];

export default function GestionEmpleados() {
  const [empleados, setEmpleados] =
    useState<Empleado[]>(empleadosIniciales);

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const guardarEmpleado = (nuevoEmpleado: Omit<Empleado, "IdEmpleado">) => {
    const empleado: Empleado = {
      IdEmpleado: empleados.length + 1,
      ...nuevoEmpleado,
    };

    setEmpleados([...empleados, empleado]);
    setMostrarFormulario(false);
  };

  return (
    <div className="empleados-container">

      {/* Encabezado */}
      <header className="empleados-header">
        <div>
          <span className="empleados-subtitle">
            SISTEMA DE CITAS
          </span>

          <h1>Gestión de Empleados</h1>

          <p>
            Consulta y administra la información de los
            empleados registrados en el sistema.
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
              <th>Teléfono</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Fecha Ingreso</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.IdEmpleado}>
                <td>{empleado.IdEmpleado}</td>

                <td>{empleado.Nombre}</td>

                <td>{empleado.Apellido}</td>

                <td>{empleado.Telefono}</td>

                <td>{empleado.Email}</td>

                <td>{empleado.Cargo}</td>

                <td>{empleado.FechaIngreso}</td>

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
                  <button className="btn-editar">
                    Editar
                  </button>

                  <button className="btn-eliminar">
                    Eliminar
                  </button>
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