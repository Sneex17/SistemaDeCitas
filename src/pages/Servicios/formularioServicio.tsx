import { useState, useEffect } from "react";
import "../Servicios/gestionServicio.css";
import { ListaEstadosEmpleados } from "../../Controllers/EstadoController";
import { GuardarServicio } from "../../Controllers/ServiciosController";
import { type Estado } from "../../entities/Estado";
import { type Servicios } from "../../services/Servicios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alertas = withReactContent(Swal);

interface ServicioFormProps {
  onGuardar: (servicio: Servicios) => void;
  onCancelar: () => void;
}

export default function ServicioForm({
  onGuardar,
  onCancelar,
}: ServicioFormProps) {
  const [nuevoServicio, setNuevoServicio] = useState<Omit<Servicios, "IdServicio">>({
    Nombre: "",
    Precio: 0,
    IdEstado: 0,
  });

  const [estado, setEstado] = useState<Estado[]>([]);

  useEffect(() => {
    ListaEstadosEmpleados().then(setEstado);
  }, []);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNuevoServicio((prev) => ({
      ...prev,
      [name]: name === "Precio" || name.startsWith("Id") ? Number(value) : value,
    }));
  };

  const guardarServicio = async () => {
    if (
      !nuevoServicio.Nombre.trim() ||
      nuevoServicio.Precio <= 0 ||
      !nuevoServicio.IdEstado
    ) {
      Alertas.fire({
        title: <p>Campos requeridos</p>,
        icon: "warning",
        text: "Favor de llenar los campos faltantes correctamente!",
      });
      return;
    }

    const result = await GuardarServicio(nuevoServicio as Servicios);

    if (result) {
      Alertas.fire({
        title: "¡Éxito!",
        text: "Servicio registrado correctamente",
        icon: "success",
      });
      onGuardar(nuevoServicio as Servicios);
    } else {
      Alertas.fire({
        title: "Error",
        text: "No se pudo guardar el servicio en la base de datos",
        icon: "error",
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-servicio">
        {/* Encabezado */}
        <div className="modal-servicio-header">
          <div>
            <h2>Nuevo Servicio</h2>
            <p>Registre la información del nuevo servicio</p>
          </div>

          <button className="btn-cerrar-modal" onClick={onCancelar}>
            ×
          </button>
        </div>

        {/* Formulario */}
        <div className="formulario-servicio">
          {/* Nombre del Servicio */}
          <div className="campo-servicio">
            <label>Nombre del Servicio *</label>
            <input
              type="text"
              name="Nombre"
              value={nuevoServicio.Nombre}
              onChange={manejarCambio}
              placeholder="Ej. Corte de Cabello"
            />
          </div>

          {/* Precio */}
          <div className="campo-servicio">
            <label>Precio ($) *</label>
            <input
              type="number"
              name="Precio"
              step="0.01"
              value={nuevoServicio.Precio || ""}
              onChange={manejarCambio}
              placeholder="0.00"
            />
          </div>

          {/* Estado */}
          <div className="campo-servicio">
            <label>Estado *</label>
            <select
              name="IdEstado"
              value={nuevoServicio.IdEstado}
              onChange={manejarCambio}
            >
              <option value={0}>Seleccionar estado</option>
              {estado.map((e) => (
                <option key={e.IdEstado} value={e.IdEstado}>
                  {e.Estado}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="modal-servicio-actions">
          <button className="btn-cancelar-servicio" onClick={onCancelar}>
            Cancelar
          </button>

          <button className="btn-guardar-servicio" onClick={guardarServicio}>
            Guardar Servicio
          </button>
        </div>
      </div>
    </div>
  );
}