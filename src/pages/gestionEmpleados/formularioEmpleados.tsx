import { useState, useEffect } from "react";
import { ListaSexos } from "../../Controllers/SexoController";
import { ListaNacionalidades } from "../../Controllers/NacionalidadController";
import { ListaRoles } from "../../Controllers/RolController";
import { ListaEstadosEmpleados } from "../../Controllers/EstadoController";
import { ListaEstadoCivil} from "../../Controllers/ControllerEstadoCivil"
import { type Rol } from "../../entities/Rol";
import { type Nacionalidad } from "../../entities/Nacionalidad";
import { type Sexo } from "../../entities/Sexo";
import { type Estado } from "../../entities/Estado";
import { type EstadoCivil} from "../../entities/EstadoCivil"
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
  const [nuevoEmpleado, setNuevoEmpleado] = useState<EmpleadoFormData>({
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
    >,
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

  const [sexos, setSexos] = useState<Sexo[]>([]);
  useEffect(() => {
    ListaSexos().then(setSexos);
  }, []);

  const [nacionalidad, setNacionalidad] = useState<Nacionalidad[]>([]);
  useEffect(() => {
    ListaNacionalidades().then(setNacionalidad);
  }, []);

  const [rol, setRol] = useState<Rol[]>([]);
  useEffect(() => {
    ListaRoles().then(setRol);
  }, []);

  const [estado, setEstado] = useState<Estado[]>([]);
  useEffect(() => {
    ListaEstadosEmpleados().then(setEstado);
  }, []);

  const [estadoCivil, setEstadoCivil] = useState<EstadoCivil[]>([]);
  useEffect(() => {
    ListaEstadoCivil().then(setEstadoCivil);
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-empleado">
        {/* Encabezado */}
        <div className="modal-empleado-header">
          <div>
            <h2>Nuevo Empleado</h2>

            <p>Registre la información del nuevo empleado</p>
          </div>

          <button className="btn-cerrar-modal" onClick={onCancelar}>
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
              <option value="">Seleccione el sexo</option>
              {sexos.map((s) => (
                <option key={s.IdSexo} value={s.IdSexo}>
                  {s.Sexo}
                </option>
              ))}
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
              <option value="">Seleccione la nacionalidad</option>
              {nacionalidad.map((n) => (
                <option key={n.IdNacionalidad} value={n.IdNacionalidad}>
                  {n.Nacionalidad}
                </option>
              ))}
            </select>
          </div>

          {/* EstadoCivil */}
          <div className="campo-empleado">
            <label>Estado Civil</label>

            <select
              name="Nacionalidad"
              value={nuevoEmpleado.Nacionalidad}
              onChange={manejarCambio}
            >
              <option value="">Seleccione el estado civil</option>
              {estadoCivil.map((e) => (
                <option key={e.IdEstadoCivil} value={e.IdEstadoCivil}>
                  {e.EstadoCivil}
                </option>
              ))}
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
              <option value="">Seleccione el cargo</option>
              {rol.map((r) => (
                <option key={r.IdRol} value={r.IdRol}>
                  {r.Rol}{" "}
                </option>
              ))}
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
              {estado.map((e) => (
                <option key={e.IdEstado} value={e.IdEstado}>
                  {e.Estado}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botones */}
        <div className="modal-empleado-actions">
          <button className="btn-cancelar-empleado" onClick={onCancelar}>
            Cancelar
          </button>

          <button className="btn-guardar-empleado" onClick={guardarEmpleado}>
            Guardar Empleado
          </button>
        </div>
      </div>
    </div>
  );
}
