import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import EmpleadoForm from "./formularioEmpleados";
import "./gestionEmpleados.css";
import {
  type EmpleadoDetalle,
  ListaEmpleados,
  DesactivarEmpleado,
} from "../../Controllers/EmpleadoController";

import { type Empleado } from "../../entities/Empleado";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alertas = withReactContent(Swal);

export default function GestionEmpleados() {
  const [Empleados, setEmpleados] = useState<EmpleadoDetalle[]>([]);
  useEffect(() => {
    ListaEmpleados().then(setEmpleados);
  }, []);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const guardarEmpleado = (nuevoEmpleado: Omit<Empleado, "IdEmpleado">) => {
    //console.log(nuevoEmpleado)
    setMostrarFormulario(false);
  };
  const manejarEliminar = (idEmpleado: number) => {
    Alertas.fire({
      title: "¿Inactivar empleado?",
      text: "El estado del empleado cambiará a Inactivo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, inactivar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const exito = await DesactivarEmpleado(idEmpleado);

        if (exito) {
          setEmpleados((prev) =>
            prev.map((emp) =>
              emp.IdEmpleado === idEmpleado
                ? { ...emp, Estado: "Inactivo" }
                : emp,
            ),
          );

          Alertas.fire({
            title: "¡Inactivado!",
            text: "El empleado ha sido marcado como Inactivo.",
            icon: "success",
          });
        } else {
          Alertas.fire({
            title: "Error",
            text: "No se pudo cambiar el estado del empleado.",
            icon: "error",
          });
        }
      }
    });
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

                  <button
                    className="btn-eliminar"
                    onClick={() => manejarEliminar(empleado.IdEmpleado)}
                  >
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
