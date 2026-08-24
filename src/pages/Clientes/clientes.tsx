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
  const [clienteAEditar, setClienteAEditar] = useState<ClienteDetalle | null>(
    null,
  );
  const [clientes, setClientes] = useState<ClienteDetalle[]>([]);

  const cargarClientes = () => {
    ListaClientes().then(setClientes);
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const abrirCrear = () => {
    setClienteAEditar(null);
    setMostrarFormulario(true);
  };

  const abrirEditar = (cliente: ClienteDetalle) => {
    setClienteAEditar(cliente);
    setMostrarFormulario(true);
  };

  const manejarEliminar = (idcliente: number) => {
    Alertas.fire({
      title: "¿Inactivar cliente?",
      text: "El estado del cliente cambiará a Inactivo.",
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
          setClientes((prev) =>
            prev.map((c) =>
              c.IdCliente === idcliente ? { ...c, Estado: "Inactivo" } : c,
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

        <button className="btn-nuevo-cliente" onClick={abrirCrear}>
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
              <th>Sexo</th>
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
                  <button
                    className="btn-editar"
                    onClick={() => abrirEditar(cliente)}
                  >
                    Editar
                  </button>

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

      {/* Formulario Modal */}
      {mostrarFormulario && (
        <ClienteForm
          clienteAEditar={clienteAEditar}
          onGuardar={() => {
            cargarClientes();
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