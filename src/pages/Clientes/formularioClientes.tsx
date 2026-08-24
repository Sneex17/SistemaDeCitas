import { useState, useEffect } from "react";
import { ListaSexos } from "../../Controllers/SexoController";
import { type Sexo } from "../../entities/Sexo";
import { ListaNacionalidades } from "../../Controllers/NacionalidadController";
import { type Estado } from "../../entities/Estado";
import { type Nacionalidad } from "../../entities/Nacionalidad";
import { ListaEstadosEmpleados } from "../../Controllers/EstadoController";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  GuardarCliente,
  type ClienteDetalle,
} from "../../Controllers/ClienteController";
import type { Cliente } from "../../entities/Cliente";

interface ClienteFormProps {
  clienteAEditar?: ClienteDetalle | null;
  onGuardar: (cliente: Cliente) => void;
  onCancelar: () => void;
}

const Alertas = withReactContent(Swal);

export default function ClienteForm({
  clienteAEditar,
  onGuardar,
  onCancelar,
}: ClienteFormProps) {
  const [sexos, setSexo] = useState<Sexo[]>([]);
  const [nacionalidad, setNacionalidad] = useState<Nacionalidad[]>([]);
  const [estado, setEstado] = useState<Estado[]>([]);

  const [nuevoCliente, setNuevoCliente] = useState<Cliente>({
    Nombre: "",
    Apellido: "",
    IdSexo: 0,
    IdNacionalidad: 0,
    FechaNacimiento: "",
    Telefono: "",
    Direccion: "",
    Email: "",
    Contrasena: "",
    IdEstado: 0,
  });

  // Cargar catálogos
  useEffect(() => {
    ListaSexos().then(setSexo);
    ListaNacionalidades().then(setNacionalidad);
    ListaEstadosEmpleados().then(setEstado);
  }, []);

  // Precargar datos si se está editando
  useEffect(() => {
    if (
      clienteAEditar &&
      sexos.length > 0 &&
      nacionalidad.length > 0 &&
      estado.length > 0
    ) {
      const sexoEncontrado = sexos.find((s) => s.Sexo === clienteAEditar.Sexo);
      const nacEncontrada = nacionalidad.find(
        (n) => n.Nacionalidad === clienteAEditar.Nacionalidad,
      );
      const estadoEncontrado = estado.find(
        (e) => e.Estado === clienteAEditar.Estado,
      );

      setNuevoCliente({
        IdCliente: clienteAEditar.IdCliente,
        Nombre: clienteAEditar.Nombre,
        Apellido: clienteAEditar.Apellido,
        Telefono: clienteAEditar.Telefono,
        Direccion: clienteAEditar.Direccion || "",
        Email: clienteAEditar.Email,
        Contrasena: "",
        IdSexo: sexoEncontrado ? sexoEncontrado.IdSexo : 0,
        IdNacionalidad: nacEncontrada ? nacEncontrada.IdNacionalidad : 0,
        IdEstado: estadoEncontrado ? estadoEncontrado.IdEstado : 0,
        FechaNacimiento: clienteAEditar.FechaNacimiento || "",
      });
    }
  }, [clienteAEditar, sexos, nacionalidad, estado]);

  const manejarCambio = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setNuevoCliente((prev) => ({
      ...prev,
      [name]: name.startsWith("Id") ? Number(value) : value,
    }));
  };

  const guardarCliente = async () => {
    if (
      !nuevoCliente.Nombre ||
      !nuevoCliente.Apellido ||
      !nuevoCliente.Email ||
      !nuevoCliente.Telefono
    ) {
      Alertas.fire({
        title: <p>Campos requeridos</p>,
        icon: "warning",
        text: "Favor de llenar los campos faltantes!",
      });
      return;
    }

    const result = await GuardarCliente(nuevoCliente);

    if (result) {
      Alertas.fire({
        title: "¡Éxito!",
        text: clienteAEditar
          ? "Cliente actualizado correctamente"
          : "Cliente registrado correctamente",
        icon: "success",
      });
      onGuardar(nuevoCliente);
    } else {
      Alertas.fire({
        title: "Error",
        text: "No se pudo guardar el cliente en la base de datos",
        icon: "error",
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-cliente">
        <div className="modal-cliente-header">
          <div>
            <h2>{clienteAEditar ? "Editar Cliente" : "Nuevo Cliente"}</h2>
            <p>
              {clienteAEditar
                ? "Actualice la información del cliente"
                : "Registre la información del nuevo cliente"}
            </p>
          </div>

          <button className="btn-cerrar-modal" onClick={onCancelar}>
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
              name="IdSexo"
              value={nuevoCliente.IdSexo}
              onChange={manejarCambio}
            >
              <option value={0}>Seleccione el sexo</option>
              {sexos.map((s) => (
                <option key={s.IdSexo} value={s.IdSexo}>
                  {s.Sexo}
                </option>
              ))}
            </select>
          </div>

          <div className="campo-cliente">
            <label>Nacionalidad</label>
            <select
              name="IdNacionalidad"
              value={nuevoCliente.IdNacionalidad}
              onChange={manejarCambio}
            >
              <option value={0}>Seleccione la nacionalidad</option>
              {nacionalidad.map((n) => (
                <option key={n.IdNacionalidad} value={n.IdNacionalidad}>
                  {n.Nacionalidad}
                </option>
              ))}
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
              name="Contrasena"
              value={nuevoCliente.Contrasena}
              onChange={manejarCambio}
              placeholder={
                clienteAEditar
                  ? "Dejar en blanco para mantener la actual"
                  : "Ingrese la contraseña"
              }
            />
          </div>

          <div className="campo-cliente">
            <label>Estado</label>
            <select
              name="IdEstado"
              value={nuevoCliente.IdEstado}
              onChange={manejarCambio}
            >
              <option value={0}>Seleccione estado</option>
              {estado.map((e) => (
                <option key={e.IdEstado} value={e.IdEstado}>
                  {e.Estado}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botones */}
        <div className="modal-cliente-actions">
          <button className="btn-cancelar-cliente" onClick={onCancelar}>
            Cancelar
          </button>

          <button className="btn-guardar-cliente" onClick={guardarCliente}>
            {clienteAEditar ? "Actualizar Cliente" : "Guardar Cliente"}
          </button>
        </div>
      </div>
    </div>
  );
}