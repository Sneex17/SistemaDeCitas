import React from "react";
import "../Servicios/gestionServicio.css";

interface ServicioFormProps {
  onGuardar: () => void;
  onCancelar: () => void;
}

export default function ServicioForm({
  onGuardar,
  onCancelar,
}: ServicioFormProps) {
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
              placeholder="0.00"
            />
          </div>

          {/* Estado */}
          <div className="campo-servicio">
            <label>Estado</label>
            <select name="IdEstado" defaultValue={1}>
              <option value={1}>Activo</option>
              <option value={2}>Inactivo</option>
            </select>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="modal-servicio-actions">
          <button className="btn-cancelar-servicio" onClick={onCancelar}>
            Cancelar
          </button>

          <button className="btn-guardar-servicio" onClick={onGuardar}>
            Guardar Servicio
          </button>
        </div>
      </div>
    </div>
  );
}