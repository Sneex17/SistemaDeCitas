import { Link } from "react-router-dom";
import "./clientes.css";
import ClienteForm from "./formularioClientes";
import { useState } from "react";

interface Cliente {
  IdCliente: number;
  Nombre: string;
  Apellido: string;
  Sexo: string;
  Nacionalidad: string;
  FechaNacimiento: string;
  Telefono: string;
  Direccion: string;
  Email: string;
  Estado: string;
}

const clientes: Cliente[] = [
  {
    IdCliente: 1,
    Nombre: "María",
    Apellido: "Rodríguez",
    Sexo: "Femenino",
    Nacionalidad: "Dominicana",
    FechaNacimiento: "1998-05-12",
    Telefono: "809-555-1234",
    Direccion: "Santo Domingo",
    Email: "maria@gmail.com",
    Estado: "Activo",
  },
  {
    IdCliente: 2,
    Nombre: "Carlos",
    Apellido: "Martínez",
    Sexo: "Masculino",
    Nacionalidad: "Dominicana",
    FechaNacimiento: "1995-08-20",
    Telefono: "809-555-5678",
    Direccion: "Santo Domingo",
    Email: "carlos@gmail.com",
    Estado: "Activo",
  },
];

export default function Clientes() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="clientes-container">

     
      <header className="clientes-header">
        <div>
          <span className="clientes-subtitle">
            SISTEMA DE CITAS
          </span>

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


