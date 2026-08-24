import { useState, useEffect } from "react";
import "./citas.css";
import {
  ListaEmpleados,
  type EmpleadoDetalle,
} from "../../Controllers/EmpleadoController";
import {
  type ServicioDetalle,
  ListaServicio,
} from "../../Controllers/ServiciosController";
import {
  type ClienteDetalle,
  ListaClientes,
} from "../../Controllers/ClienteController";
import { type Estado } from "../../entities/Estado";
import { ListaEstadosCitas } from "../../Controllers/EstadoController";
import {
  ListaCitas,
  AgregarNuevaCita,
  CancelarCita,
  EditarCita,
} from "../../Controllers/CitaController";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alertas = withReactContent(Swal);

interface CitaView {
  idCita: number;
  cliente: string;
  empleado: string;
  servicio: string;
  fecha: string;
  hora: string;
  descripcion: string;
  precioTotal: number;
  estado: string;
}

export default function Citas() {
  const [citas, setCitas] = useState<CitaView[]>([]);
  const [Empleados, setEmpleados] = useState<EmpleadoDetalle[]>([]);
  const [servicios, setServicios] = useState<ServicioDetalle[]>([]);
  const [clientes, setCliente] = useState<ClienteDetalle[]>([]);
  const [estado, setEstado] = useState<Estado[]>([]);

  // Estado para la edición
  const [idCitaEditar, setIdCitaEditar] = useState<number | null>(null);

  const cargarCitas = async () => {
    const data = await ListaCitas();
    setCitas(data);
  };

  useEffect(() => {
    cargarCitas();
    ListaEmpleados().then(setEmpleados);
    ListaServicio().then(setServicios);
    ListaClientes().then(setCliente);
    ListaEstadosCitas().then((estadosData) => {
      setEstado(estadosData);
    });
  }, []);

  // Form states
  const [idCliente, setIdCliente] = useState<number | "">("");
  const [idEmpleado, setIdEmpleado] = useState<number | "">("");
  const [idServicioSeleccionado, setIdServicioSeleccionado] = useState<
    number | ""
  >("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioTotal, setPrecioTotal] = useState<number | "">("");
  const [idEstadoSeleccionado, setIdEstadoSeleccionado] = useState<number | "">(
    ""
  );

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const manejarCambioServicio = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setIdServicioSeleccionado(id || "");

    const servicioEncontrado = servicios.find((s) => s.IdServicio === id);
    setPrecioTotal(servicioEncontrado ? servicioEncontrado.Precio : "");
  };

  const limpiarFormulario = () => {
    setIdCliente("");
    setIdEmpleado("");
    setIdServicioSeleccionado("");
    setFecha("");
    setHora("");
    setDescripcion("");
    setPrecioTotal("");
    setIdEstadoSeleccionado("");
    setIdCitaEditar(null);
  };

  // Abrir modal para NUEVA CITA
  const handleNuevaCita = () => {
    limpiarFormulario();
    // Busca el objeto del estado 'Pendiente' para asignarlo por defecto
    const estadoPendiente = estado.find((e) => e.Estado === "Pendiente");
    if (estadoPendiente) {
      setIdEstadoSeleccionado(estadoPendiente.IdEstado);
    }
    setMostrarFormulario(true);
  };

  // Prepara el formulario para edición (Solo si es Pendiente)
  const handlePrepararEdicion = (cita: CitaView) => {
    if (cita.estado !== "Pendiente") {
      Alertas.fire({
        title: "Acción no permitida",
        text: "Solo se pueden editar las citas que estén en estado Pendiente.",
        icon: "warning",
      });
      return;
    }

    const clienteObj = clientes.find(
      (c) => `${c.Nombre} ${c.Apellido}`.trim() === cita.cliente.trim()
    );
    const empleadoObj = Empleados.find(
      (e) => `${e.Nombre} ${e.Apellido}`.trim() === cita.empleado.trim()
    );
    const servicioObj = servicios.find((s) => s.Nombre === cita.servicio);
    const estadoObj = estado.find((e) => e.Estado === cita.estado);

    setIdCitaEditar(cita.idCita);
    setIdCliente(clienteObj ? clienteObj.IdCliente : "");
    setIdEmpleado(empleadoObj ? empleadoObj.IdEmpleado : "");
    setIdServicioSeleccionado(servicioObj ? servicioObj.IdServicio : "");
    setFecha(cita.fecha);
    setHora(cita.hora);
    setDescripcion(cita.descripcion || "");
    setPrecioTotal(cita.precioTotal);
    setIdEstadoSeleccionado(estadoObj ? estadoObj.IdEstado : "");

    setMostrarFormulario(true);
  };

  const handleGuardarCita = async () => {
    if (
      !idCliente ||
      !idEmpleado ||
      !idServicioSeleccionado ||
      !fecha.trim() ||
      !hora.trim() 
    ) {
      Alertas.fire({
        title: "Campos incompletos",
        text: "Por favor complete todos los campos obligatorios.",
        icon: "warning",
      });
      return;
    }

    const citaPayload: any = {
      IdCliente: Number(idCliente),
      IdEmpleado: Number(idEmpleado),
      IdServicio: Number(idServicioSeleccionado),
      Fecha: fecha,
      Hora: hora,
      Descripcion: descripcion,
      PrecioTotal: Number(precioTotal) || 0,
      IdEstado: Number(idEstadoSeleccionado),
    };

    let exito = false;

    if (idCitaEditar) {
      exito = await EditarCita(idCitaEditar, citaPayload);
    } else {
      exito = await AgregarNuevaCita(citaPayload);
    }

    if (exito) {
      Alertas.fire({
        title: "¡Éxito!",
        text: idCitaEditar
          ? "La cita ha sido actualizada correctamente."
          : "La cita ha sido registrada correctamente.",
        icon: "success",
      });
      limpiarFormulario();
      setMostrarFormulario(false);
      cargarCitas();
    } else {
      Alertas.fire({
        title: "Error",
        text: "Ocurrió un error al procesar la cita.",
        icon: "error",
      });
    }
  };

  // Manejador para cancelar/eliminar la cita (Solo si es Pendiente)
  const handleCancelarCita = async (cita: CitaView) => {
    if (cita.estado !== "Pendiente") {
      Alertas.fire({
        title: "Acción no permitida",
        text: "Solo se pueden cancelar o eliminar las citas que estén en estado Pendiente.",
        icon: "warning",
      });
      return;
    }

    const confirmacion = await Alertas.fire({
      title: "¿Estás seguro?",
      text: "La cita cambiará su estado a Cancelada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cancelar cita",
      cancelButtonText: "No, regresar",
    });

    if (confirmacion.isConfirmed) {
      const exito = await CancelarCita(cita.idCita);

      if (exito) {
        Alertas.fire({
          title: "Cancelada",
          text: "La cita ha sido cancelada exitosamente.",
          icon: "success",
        });
        cargarCitas();
      } else {
        Alertas.fire({
          title: "Error",
          text: "No se pudo cancelar la cita.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="citas-container">
      <header className="citas-header">
        <div>
          <h1>Gestión de Citas</h1>
          <p>Administración y control de las citas del sistema</p>
        </div>

        <button onClick={handleNuevaCita} className="btn-nueva-cita">
          + Nueva Cita
        </button>
      </header>

      <section className="filtros-citas">
        <h3>Buscar Citas</h3>

        <div className="filtros-container">
          <input
            type="text"
            placeholder="Buscar cliente..."
            className="input-filtro"
          />

          <input type="date" className="input-filtro" />

          <select className="select-filtro">
            <option value="">Todos los estados</option>
            {estado.map((e) => (
              <option key={e.IdEstado} value={e.IdEstado}>
                {e.Estado}
              </option>
            ))}
          </select>

          <button className="btn-buscar">Buscar</button>
        </div>
      </section>

      <section>
        <h3>Citas Registradas</h3>

        <div className="tabla-citas-container">
          <table className="tabla-citas">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Empleado</th>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {citas.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    style={{ textAlign: "center", padding: "1.5rem" }}
                  >
                    No hay citas registradas.
                  </td>
                </tr>
              ) : (
                citas.map((cita) => (
                  <tr key={cita.idCita}>
                    <td>{cita.idCita}</td>
                    <td>{cita.cliente}</td>
                    <td>{cita.empleado}</td>
                    <td>{cita.servicio}</td>
                    <td>{cita.fecha}</td>
                    <td>{cita.hora}</td>
                    <td>RD$ {Number(cita.precioTotal).toFixed(2)}</td>

                    <td>
                      <span
                        className={`estado-cita ${
                          cita.estado === "Confirmada"
                            ? "estado-confirmada"
                            : cita.estado === "Pendiente"
                              ? "estado-pendiente"
                              : cita.estado === "Cancelada"
                                ? "estado-cancelada"
                                : "estado-completada"
                        }`}
                      >
                        {cita.estado}
                      </span>
                    </td>

                    <td>
                      <div className="acciones-cita">
                        <button
                          className="btn-accion-cita"
                          onClick={() => handlePrepararEdicion(cita)}
                        >
                          Editar
                        </button>

                        <button
                          className="btn-accion-cita btn-eliminar-cita"
                          onClick={() => handleCancelarCita(cita)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {mostrarFormulario && (
        <div className="modal-overlay">
          <div className="modal-cita">
            <h2>{idCitaEditar ? "Editar Cita" : "Nueva Cita"}</h2>

            <div className="formulario-cita">
              <select
                className="input-cita"
                value={idCliente}
                onChange={(e) =>
                  setIdCliente(e.target.value ? Number(e.target.value) : "")
                }
              >
                <option value="">Seleccione un cliente</option>
                {clientes.map((c) => (
                  <option key={c.IdCliente} value={c.IdCliente}>
                    {c.Nombre} {c.Apellido}
                  </option>
                ))}
              </select>

              <select
                className="input-cita"
                value={idEmpleado}
                onChange={(e) =>
                  setIdEmpleado(e.target.value ? Number(e.target.value) : "")
                }
              >
                <option value="">Seleccione un empleado</option>
                {Empleados.map((e) => (
                  <option key={e.IdEmpleado} value={e.IdEmpleado}>
                    {e.Nombre} {e.Apellido}
                  </option>
                ))}
              </select>

              <select
                className="input-cita"
                value={idServicioSeleccionado}
                onChange={manejarCambioServicio}
              >
                <option value="">Seleccione un servicio</option>
                {servicios.map((s) => (
                  <option key={s.IdServicio} value={s.IdServicio}>
                    {s.Nombre}
                  </option>
                ))}
              </select>

              <input
                type="date"
                className="input-cita"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />

              <input
                type="text"
                placeholder="Hora (ej. 09:00 AM)"
                className="input-cita"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              />

              <textarea
                placeholder="Descripción"
                className="input-cita textarea-cita"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              <input
                type="text"
                placeholder="Precio total"
                className="input-cita"
                value={precioTotal !== "" ? `RD$ ${precioTotal}` : ""}
                readOnly
              />

              <select
                className="input-cita"
                value={idEstadoSeleccionado}
                onChange={(e) =>
                  setIdEstadoSeleccionado(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                disabled={!idCitaEditar}
              >
                <option value="">Seleccione un estado</option>
                {estado.map((e) => (
                  <option key={e.IdEstado} value={e.IdEstado}>
                    {e.Estado}
                  </option>
                ))}
              </select>

              <div className="modal-acciones">
                <button
                  onClick={() => {
                    limpiarFormulario();
                    setMostrarFormulario(false);
                  }}
                  className="btn-cancelar"
                >
                  Cancelar
                </button>

                <button onClick={handleGuardarCita} className="btn-guardar">
                  {idCitaEditar ? "Actualizar Cita" : "Guardar Cita"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}