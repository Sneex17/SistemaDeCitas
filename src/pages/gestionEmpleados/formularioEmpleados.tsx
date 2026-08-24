import { useState, useEffect } from "react";
import { ListaSexos } from "../../Controllers/SexoController";
import { ListaNacionalidades } from "../../Controllers/NacionalidadController";
import { ListaRoles } from "../../Controllers/RolController";
import { ListaEstadosEmpleados } from "../../Controllers/EstadoController";
import { ListaEstadoCivil } from "../../Controllers/ControllerEstadoCivil";
import { type Rol } from "../../entities/Rol";
import { type Nacionalidad } from "../../entities/Nacionalidad";
import { type Sexo } from "../../entities/Sexo";
import { type Estado } from "../../entities/Estado";
import { type EstadoCivil } from "../../entities/EstadoCivil";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { type Empleado } from "../../entities/Empleado";
import {
  GuardarEmpleado,
  type EmpleadoDetalle,
} from "../../Controllers/EmpleadoController";

const Alertas = withReactContent(Swal);

interface EmpleadoFormProps {
  empleadoAEditar?: EmpleadoDetalle | null;
  onGuardar: (empleado: Empleado) => void;
  onCancelar: () => void;
}

export default function EmpleadoForm({
  empleadoAEditar,
  onGuardar,
  onCancelar,
}: EmpleadoFormProps) {
  const [sexos, setSexos] = useState<Sexo[]>([]);
  const [nacionalidad, setNacionalidad] = useState<Nacionalidad[]>([]);
  const [rol, setRol] = useState<Rol[]>([]);
  const [estado, setEstado] = useState<Estado[]>([]);
  const [estadoCivil, setEstadoCivil] = useState<EstadoCivil[]>([]);

  const [nuevoEmpleado, setNuevoEmpleado] = useState<Empleado>({
    Nombre: "",
    Apellido: "",
    IdSexo: 0,
    IdNacionalidad: 0,
    IdEstadoCivil: 0,
    FechaNacimiento: "",
    Telefono: "",
    Direccion: "",
    IdRol: 0,
    IdEstado: 0,
    FechaIngreso: "",
  });

  // Carga de catálogos
  useEffect(() => {
    ListaSexos().then(setSexos);
    ListaNacionalidades().then(setNacionalidad);
    ListaRoles().then(setRol);
    ListaEstadosEmpleados().then(setEstado);
    ListaEstadoCivil().then(setEstadoCivil);
  }, []);

  // Precargar datos si se está editando
  useEffect(() => {
    if (
      empleadoAEditar &&
      sexos.length > 0 &&
      rol.length > 0 &&
      estadoCivil.length > 0 &&
      estado.length > 0
    ) {
      const sexoEncontrado = sexos.find((s) => s.Sexo === empleadoAEditar.Sexo);
      const rolEncontrado = rol.find((r) => r.Rol === empleadoAEditar.Rol);
      const estadoCivilEncontrado = estadoCivil.find(
        (e) => e.EstadoCivil === empleadoAEditar.EstadoCivil,
      );
      const estadoEncontrado = estado.find(
        (e) => e.Estado === empleadoAEditar.Estado,
      );

      setNuevoEmpleado({
        IdEmpleado: empleadoAEditar.IdEmpleado,
        Nombre: empleadoAEditar.Nombre,
        Apellido: empleadoAEditar.Apellido,
        Telefono: empleadoAEditar.Telefono,
        Direccion: empleadoAEditar.Direccion,
        IdSexo: sexoEncontrado ? sexoEncontrado.IdSexo : 0,
        IdRol: rolEncontrado ? rolEncontrado.IdRol : 0,
        IdEstadoCivil: estadoCivilEncontrado
          ? estadoCivilEncontrado.IdEstadoCivil
          : 0,
        IdEstado: estadoEncontrado ? estadoEncontrado.IdEstado : 0,
        IdNacionalidad: 0,
        FechaNacimiento: empleadoAEditar.FechaNacimiento || "",
        FechaIngreso: empleadoAEditar.FechaIngreso || "",
      });
    }
  }, [empleadoAEditar, sexos, rol, estadoCivil, estado]);

  const manejarCambio = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setNuevoEmpleado((prev) => ({
      ...prev,
      [name]: name.startsWith("Id") ? Number(value) : value,
    }));
  };

  const guardarEmpleado = async () => {
    if (
      !nuevoEmpleado.Nombre ||
      !nuevoEmpleado.Apellido ||
      !nuevoEmpleado.Telefono ||
      !nuevoEmpleado.IdRol
    ) {
      Alertas.fire({
        title: <p>Campos requeridos</p>,
        icon: "warning",
        text: "Favor de llenar los campos faltantes!",
      });
      return;
    }

    const result = await GuardarEmpleado(nuevoEmpleado);

    if (result) {
      Alertas.fire({
        title: "¡Éxito!",
        text: empleadoAEditar
          ? "Empleado actualizado correctamente"
          : "Empleado registrado correctamente",
        icon: "success",
      });
      onGuardar(nuevoEmpleado);
    } else {
      Alertas.fire({
        title: "Error",
        text: "No se pudo guardar el empleado en la base de datos",
        icon: "error",
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-empleado">
        {/* Encabezado */}
        <div className="modal-empleado-header">
          <div>
            <h2>
              {empleadoAEditar ? "Editar Empleado" : "Nuevo Empleado"}
            </h2>

            <p>
              {empleadoAEditar
                ? "Actualice la información del empleado"
                : "Registre la información del nuevo empleado"}
            </p>
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
              name="IdSexo"
              value={nuevoEmpleado.IdSexo}
              onChange={manejarCambio}
            >
              <option value="0">Seleccione el sexo</option>
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
              name="IdNacionalidad"
              value={nuevoEmpleado.IdNacionalidad}
              onChange={manejarCambio}
            >
              <option value="0">Seleccione la nacionalidad</option>
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
              name="IdEstadoCivil"
              value={nuevoEmpleado.IdEstadoCivil}
              onChange={manejarCambio}
            >
              <option value="0">Seleccione el estado civil</option>
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

          {/* Cargo */}
          <div className="campo-empleado">
            <label>Cargo *</label>
            <select
              name="IdRol"
              value={nuevoEmpleado.IdRol}
              onChange={manejarCambio}
            >
              <option value="0">Seleccione el cargo</option>
              {rol.map((r) => (
                <option key={r.IdRol} value={r.IdRol}>
                  {r.Rol}
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
              name="IdEstado"
              value={nuevoEmpleado.IdEstado}
              onChange={manejarCambio}
            >
              <option value="0">Seleccione el estado</option>
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
            {empleadoAEditar ? "Actualizar Empleado" : "Guardar Empleado"}
          </button>
        </div>
      </div>
    </div>
  );
}