import { Link } from "react-router-dom";
import "./clientes.css";
import ClienteForm from "./formularioClientes";
import { useState, useEffect } from "react";
import {
  type ClienteDetalle,
  ListaClientes,
  DesactivarCliente,
} from "../../Controllers/ClienteController";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alertas = withReactContent(Swal);

export default function Clientes() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [clientes, setCliente] = useState<ClienteDetalle[]>([]);
  useEffect(() => {
    ListaClientes().then(setCliente);
  }, []);

  const manejarEliminar = (idcliente: number) => {
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
        const exito = await DesactivarCliente(idcliente);

        if (exito) {
          setCliente((prev) =>
            prev.map((cliente) =>
              cliente.IdCliente === idcliente
                ? { ...cliente, Estado: "Inactivo" }
                : cliente,
            ),
          );

          Alertas.fire({
            title: "¡Inactivado!",
            text: "El cliente ha sido marcado como Inactivo.",
            icon: "success",
          });
        } else {
          Alertas.fire({
            title: "Error",
            text: "No se pudo cambiar el estado del cliente.",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <div className="clientes-container">
      <header className="clientes-header">
        <div>
          <span className="clientes-subtitle">SISTEMA DE CITAS</span>

          <h1>Gestión de Clientes</h1>

          <p>
            Consulta y administra la información de los clientes registrados en
            el sistema.
          </p>
        </div>

        <Link to="/" className="btn-volver">
          ← Volver al inicio
        </Link>
      </header>

      {/* Acciones */}
      <section className="clientes-actions">
        <h2>Clientes registrados</h2>

        <button
          className="btn-nuevo-cliente"
          onClick={() => setMostrarFormulario(true)}
        >
          + Nuevo Cliente
        </button>
      </section>

      {/* Tabla */}
      <section className="clientes-table-container">
        <table className="clientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Nacionalidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.IdCliente}>
                <td>{cliente.IdCliente}</td>
                <td>{cliente.Nombre}</td>
                <td>{cliente.Apellido}</td>
                <td>{cliente.Sexo}</td>
                <td>{cliente.Telefono}</td>
                <td>{cliente.Email}</td>
                <td>{cliente.Nacionalidad}</td>

                <td>
                  <span
                    className={
                      cliente.Estado === "Activo"
                        ? "estado-activo"
                        : "estado-inactivo"
                    }
                  >
                    {cliente.Estado}
                  </span>
                </td>

                <td>
                  <button className="btn-editar">Editar</button>

                  <button
                    className="btn-eliminar"
                    onClick={() => manejarEliminar(cliente.IdCliente)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Formulario */}
      {mostrarFormulario && (
        <ClienteForm
          onGuardar={(cliente) => {
            console.log("Cliente guardado:", cliente);
            setMostrarFormulario(false);
          }}
          onCancelar={() => {
            setMostrarFormulario(false);
          }}
        />
      )}
    </div>
  );
}
