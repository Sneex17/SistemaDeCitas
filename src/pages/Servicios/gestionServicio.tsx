import { useState } from "react";
import { Link } from "react-router-dom";
import "../Servicios/gestionServicio.css";
import ServicioForm from "./formularioServicio";

export default function GestionServicios() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
            <tr>
              <td>1</td>
              <td>Corte de Cabello</td>
              <td>$15.00</td>
              <td>
                <span className="estado-activo">Activo</span>
              </td>
              <td>
                <button className="btn-editar">Editar</button>
                <button className="btn-eliminar">Eliminar</button>
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>Secado y Peinado</td>
              <td>$25.00</td>
              <td>
                <span className="estado-activo">Activo</span>
              </td>
              <td>
                <button className="btn-editar">Editar</button>
                <button className="btn-eliminar">Eliminar</button>
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>Tinte Completo</td>
              <td>$50.00</td>
              <td>
                <span className="estado-inactivo">Inactivo</span>
              </td>
              <td>
                <button className="btn-editar">Editar</button>
                <button className="btn-eliminar">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Modal */}
      {mostrarFormulario && (
        <ServicioForm
          onGuardar={() => setMostrarFormulario(false)}
          onCancelar={() => setMostrarFormulario(false)}
        />
      )}
    </div>
  );
}