import { useState } from "react";

interface ClienteFormProps {
  onGuardar: (cliente: any) => void;
  onCancelar: () => void;
}

export default function ClienteForm({
  onGuardar,
  onCancelar,
}: ClienteFormProps) {
  const [nuevoCliente, setNuevoCliente] = useState({
    Nombre: "",
    Apellido: "",
    Sexo: "",
    Nacionalidad: "",
    FechaNacimiento: "",
    Telefono: "",
    Direccion: "",
    Email: "",
    Contraseña: "",
    Estado: "Activo",
  });

  const manejarCambio = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setNuevoCliente({
      ...nuevoCliente,
      [name]: value,
    });
  };

  const guardarCliente = () => {
    if (
      !nuevoCliente.Nombre ||
      !nuevoCliente.Apellido ||
      !nuevoCliente.Email ||
      !nuevoCliente.Telefono
    ) {
      alert("Complete los campos obligatorios.");
      return;
    }

    onGuardar(nuevoCliente);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-cliente">

        
        <div className="modal-cliente-header">
          <div>
            <h2>Nuevo Cliente</h2>

            <p>
              Registre la información del nuevo cliente
            </p>
          </div>

          <button
            className="btn-cerrar-modal"
            onClick={onCancelar}
          >
            ×
          </button>
        </div>

        {/* Campos */}
        <div className="formulario-cliente">

          <div className="campo-cliente">
            <label>Nombre *</label>

            <input
              type="text"
              name="Nombre"
              value={nuevoCliente.Nombre}
              onChange={manejarCambio}
              placeholder="Ingrese el nombre"
            />
          </div>

          <div className="campo-cliente">
            <label>Apellido *</label>

            <input
              type="text"
              name="Apellido"
              value={nuevoCliente.Apellido}
              onChange={manejarCambio}
              placeholder="Ingrese el apellido"
            />
          </div>

          <div className="campo-cliente">
            <label>Sexo</label>

            <select
              name="Sexo"
              value={nuevoCliente.Sexo}
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

          <div className="campo-cliente">
            <label>Nacionalidad</label>

            <select
              name="Nacionalidad"
              value={nuevoCliente.Nacionalidad}
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

          <div className="campo-cliente">
            <label>Fecha de nacimiento</label>

            <input
              type="date"
              name="FechaNacimiento"
              value={nuevoCliente.FechaNacimiento}
              onChange={manejarCambio}
            />
          </div>

          <div className="campo-cliente">
            <label>Teléfono *</label>

            <input
              type="tel"
              name="Telefono"
              value={nuevoCliente.Telefono}
              onChange={manejarCambio}
              placeholder="809-555-0000"
            />
          </div>

          <div className="campo-cliente campo-completo">
            <label>Dirección</label>

            <textarea
              name="Direccion"
              value={nuevoCliente.Direccion}
              onChange={manejarCambio}
              placeholder="Ingrese la dirección"
            />
          </div>

          <div className="campo-cliente">
            <label>Email *</label>

            <input
              type="email"
              name="Email"
              value={nuevoCliente.Email}
              onChange={manejarCambio}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="campo-cliente">
            <label>Contraseña</label>

            <input
              type="password"
              name="Contraseña"
              value={nuevoCliente.Contraseña}
              onChange={manejarCambio}
              placeholder="Ingrese la contraseña"
            />
          </div>

          <div className="campo-cliente">
            <label>Estado</label>

            <select
              name="Estado"
              value={nuevoCliente.Estado}
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
        <div className="modal-cliente-actions">

          <button
            className="btn-cancelar-cliente"
            onClick={onCancelar}
          >
            Cancelar
          </button>

          <button
            className="btn-guardar-cliente"
            onClick={guardarCliente}
          >
            Guardar Cliente
          </button>

        </div>

      </div>
    </div>
  );
}