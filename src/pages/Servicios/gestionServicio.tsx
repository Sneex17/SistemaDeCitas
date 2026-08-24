import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ServicioForm from "./formularioServicio";
import "../Servicios/gestionServicio.css";
import {
  type ServicioDetalle,
  ListaServicio,
  DesactivarServicio,
} from "../../Controllers/ServiciosController";

import { type Servicios } from "../../services/Servicios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alertas = withReactContent(Swal);

export default function GestionServicios() {
  const [servicios, setServicios] = useState<ServicioDetalle[]>([]);

  const cargarServicios = () => {
    ListaServicio().then(setServicios);
  };
  console.log(servicios);
  useEffect(() => {
    cargarServicios();
  }, []);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const guardarServicio = (_nuevoServicio: Servicios) => {
    setMostrarFormulario(false);
    cargarServicios();
  };

  const manejarEliminar = (idServicio: number) => {
    Alertas.fire({
      title: "¿Inactivar servicio?",
      text: "El estado del servicio cambiará a Inactivo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, inactivar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const exito = await DesactivarServicio(idServicio);

        if (exito) {
          setServicios((prev) =>
            prev.map((servicio) =>
              servicio.IdServicio === idServicio
                ? { ...servicio, Estado: "Inactivo" }
                : servicio,
            ),
          );

          Alertas.fire({
            title: "¡Inactivado!",
            text: "El servicio ha sido marcado como Inactivo.",
            icon: "success",
          });
        } else {
          Alertas.fire({
            title: "Error",
            text: "No se pudo cambiar el estado del servicio.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="servicios-container">
      {/* Encabezado */}
      <header className="servicios-header">
        <div>
          <span className="servicios-subtitle">SISTEMA DE CITAS</span>

          <h1>Gestión de Servicios</h1>

          <p>
            Consulta y administra la información de los servicios disponibles y
            sus precios.
          </p>
        </div>

        <Link to="/" className="btn-volver">
          ← Volver al inicio
        </Link>
      </header>

      {/* Acciones */}
      <section className="servicios-actions">
        <h2>Servicios registrados</h2>

        <button
          className="btn-nuevo-servicio"
          onClick={() => setMostrarFormulario(true)}
        >
          + Nuevo Servicio
        </button>
      </section>

      {/* Tabla */}
      <section className="servicios-table-container">
        <table className="servicios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Servicio</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.IdServicio}>
                <td>{servicio.IdServicio}</td>

                <td>{servicio.Nombre}</td>

                <td>{servicio.Precio}</td>

                <td>
                  <span
                    className={
                      servicio.Estado === "Activo"
                        ? "estado-activo"
                        : "estado-inactivo"
                    }
                  >
                    {servicio.Estado}
                  </span>
                </td>

                <td>
                  <button className="btn-editar">Editar</button>

                  <button
                    className="btn-eliminar"
                    onClick={() => manejarEliminar(servicio.IdServicio)}
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
        <ServicioForm
          onGuardar={guardarServicio}
          onCancelar={() => setMostrarFormulario(false)}
        />
      )}
    </div>
  );
}
