import { useState } from "react";

interface EmpleadoFormData {
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

interface EmpleadoFormProps {
  onGuardar: (empleado: EmpleadoFormData) => void;
  onCancelar: () => void;
}

export default function EmpleadoForm({
  onGuardar,
  onCancelar,
}: EmpleadoFormProps) {
  const [nuevoEmpleado, setNuevoEmpleado] =
    useState<EmpleadoFormData>({
      Nombre: "",
      Apellido: "",
      Sexo: "",
      Nacionalidad: "",
      FechaNacimiento: "",
      Telefono: "",
      Direccion: "",
      Email: "",
      Cargo: "",
      FechaIngreso: "",
      Estado: "Activo",
    });

  const manejarCambio = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setNuevoEmpleado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const guardarEmpleado = () => {
    if (
      !nuevoEmpleado.Nombre ||
      !nuevoEmpleado.Apellido ||
      !nuevoEmpleado.Email ||
      !nuevoEmpleado.Telefono ||
      !nuevoEmpleado.Cargo
    ) {
      alert("Complete los campos obligatorios.");
      return;
    }

    onGuardar(nuevoEmpleado);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-empleado">

        {/* Encabezado */}
        <div className="modal-empleado-header">
          <div>
            <h2>Nuevo Empleado</h2>

            <p>
              Registre la información del nuevo empleado
            </p>
          </div>

          <button
            className="btn-cerrar-modal"
            onClick={onCancelar}
          >
            ×
          </button>
        </div>

        {/* Formulario */}
        <div className="formulario-empleado">

          {/* Nombre */}
          <div className="campo-empleado">
            <label>Nombre *</label>

            <input
              type="text"
              name="Nombre"
              value={nuevoEmpleado.Nombre}
              onChange={manejarCambio}
              placeholder="Ingrese el nombre"
            />
          </div>

          {/* Apellido */}
          <div className="campo-empleado">
            <label>Apellido *</label>

            <input
              type="text"
              name="Apellido"
              value={nuevoEmpleado.Apellido}
              onChange={manejarCambio}
              placeholder="Ingrese el apellido"
            />
          </div>

          {/* Sexo */}
          <div className="campo-empleado">
            <label>Sexo</label>

            <select
              name="Sexo"
              value={nuevoEmpleado.Sexo}
              onChange={manejarCambio}
            >
              <option value="">
                Seleccione el sexo
              </option>

              <option value="Femenino">
                Femenino
              </option>

              <option value="Masculino">
                Masculino
              </option>
            </select>
          </div>

          {/* Nacionalidad */}
          <div className="campo-empleado">
            <label>Nacionalidad</label>

            <select
              name="Nacionalidad"
              value={nuevoEmpleado.Nacionalidad}
              onChange={manejarCambio}
            >
              <option value="">
                Seleccione la nacionalidad
              </option>

              <option value="Dominicana">
                Dominicana
              </option>

              <option value="Estadounidense">
                Estadounidense
              </option>

              <option value="Colombiana">
                Colombiana
              </option>

              <option value="Venezolana">
                Venezolana
              </option>

              <option value="Española">
                Española
              </option>
            </select>
          </div>

          {/* Fecha de nacimiento */}
          <div className="campo-empleado">
            <label>Fecha de nacimiento</label>

            <input
              type="date"
              name="FechaNacimiento"
              value={nuevoEmpleado.FechaNacimiento}
              onChange={manejarCambio}
            />
          </div>

          {/* Teléfono */}
          <div className="campo-empleado">
            <label>Teléfono *</label>

            <input
              type="tel"
              name="Telefono"
              value={nuevoEmpleado.Telefono}
              onChange={manejarCambio}
              placeholder="809-555-0000"
            />
          </div>

          {/* Dirección */}
          <div className="campo-empleado campo-completo">
            <label>Dirección</label>

            <textarea
              name="Direccion"
              value={nuevoEmpleado.Direccion}
              onChange={manejarCambio}
              placeholder="Ingrese la dirección"
            />
          </div>

          {/* Email */}
          <div className="campo-empleado">
            <label>Email *</label>

            <input
              type="email"
              name="Email"
              value={nuevoEmpleado.Email}
              onChange={manejarCambio}
              placeholder="correo@ejemplo.com"
            />
          </div>

          {/* Cargo */}
          <div className="campo-empleado">
            <label>Cargo *</label>

            <select
              name="Cargo"
              value={nuevoEmpleado.Cargo}
              onChange={manejarCambio}
            >
              <option value="">
                Seleccione el cargo
              </option>

              <option value="Recepcionista">
                Recepcionista
              </option>

              <option value="Estilista">
                Estilista
              </option>

              <option value="Manicurista">
                Manicurista
              </option>

              <option value="Barbero">
                Barbero
              </option>

              <option value="Masajista">
                Masajista
              </option>

              <option value="Administrador">
                Administrador
              </option>
            </select>
          </div>

          {/* Fecha de ingreso */}
          <div className="campo-empleado">
            <label>Fecha de ingreso</label>

            <input
              type="date"
              name="FechaIngreso"
              value={nuevoEmpleado.FechaIngreso}
              onChange={manejarCambio}
            />
          </div>

          {/* Estado */}
          <div className="campo-empleado">
            <label>Estado</label>

            <select
              name="Estado"
              value={nuevoEmpleado.Estado}
              onChange={manejarCambio}
            >
              <option value="Activo">
                Activo
              </option>

              <option value="Inactivo">
                Inactivo
              </option>
            </select>
          </div>
        </div>

        {/* Botones */}
        <div className="modal-empleado-actions">
          <button
            className="btn-cancelar-empleado"
            onClick={onCancelar}
          >
            Cancelar
          </button>

          <button
            className="btn-guardar-empleado"
            onClick={guardarEmpleado}
          >
            Guardar Empleado
          </button>
        </div>

      </div>
    </div>
  );
}