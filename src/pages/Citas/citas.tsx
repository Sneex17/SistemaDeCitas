import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./citas.css";
import { ListaEmpleados, type EmpleadoDetalle } from "../../Controllers/EmpleadoController";
import { type ServicioDetalle, ListaServicio } from "../../Controllers/ServiciosController";
import { type ClienteDetalle, ListaClientes } from "../../Controllers/ClienteController";

interface Cita {
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
  const [Empleados, setEmpleados] = useState<EmpleadoDetalle[]>([]);
  useEffect(() => {
    ListaEmpleados().then(setEmpleados);
  }, []);

  const [servicios, setServicios] = useState<ServicioDetalle[]>([]);
  useEffect(() => {
    ListaServicio().then(setServicios);
  }, []);

  const [clientes, setCliente] = useState<ClienteDetalle[]>([]);
  useEffect(() => {
    ListaClientes().then(setCliente);
  }, []);

  // Estados para el servicio seleccionado y su precio dinámico
  const [idServicioSeleccionado, setIdServicioSeleccionado] = useState<number | "">("");
  const [precioTotal, setPrecioTotal] = useState<number | "">("");

  const manejarCambioServicio = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setIdServicioSeleccionado(id);

    const servicioEncontrado = servicios.find((s) => s.IdServicio === id);
    setPrecioTotal(servicioEncontrado ? servicioEncontrado.Precio : "");
  };

  const [citas, setCitas] = useState<Cita[]>([
    {
      idCita: 1,
      cliente: "María Rodríguez",
      empleado: "Ana Martínez",
      servicio: "Corte de cabello",
      fecha: "2026-08-25",
      hora: "09:00 AM",
      descripcion: "Cita regular",
      precioTotal: 850,
      estado: "Pendiente",
    },
    {
      idCita: 2,
      cliente: "Carlos Pérez",
      empleado: "Laura Gómez",
      servicio: "Barbería",
      fecha: "2026-08-25",
      hora: "11:30 AM",
      descripcion: "Corte y arreglo de barba",
      precioTotal: 1000,
      estado: "Confirmada",
    },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="citas-container">
      <header className="citas-header">
        <div>
          <h1>Gestión de Citas</h1>
          <p>Administración y control de las citas del sistema</p>
        </div>

        <button
          onClick={() => setMostrarFormulario(true)}
          className="btn-nueva-cita"
        >
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
            <option value="pendiente">Pendiente</option>
            <option value="confirmada">Confirmada</option>
            <option value="cancelada">Cancelada</option>
            <option value="completada">Completada</option>
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
              {citas.map((cita) => (
                <tr key={cita.idCita}>
                  <td>{cita.idCita}</td>
                  <td>{cita.cliente}</td>
                  <td>{cita.empleado}</td>
                  <td>{cita.servicio}</td>
                  <td>{cita.fecha}</td>
                  <td>{cita.hora}</td>
                  <td>RD$ {cita.precioTotal.toFixed(2)}</td>

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
                      <button className="btn-accion-cita">Editar</button>

                      <button className="btn-accion-cita btn-eliminar-cita">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {mostrarFormulario && (
        <div className="modal-overlay">
          <div className="modal-cita">
            <h2>Nueva Cita</h2>

            <div className="formulario-cita">
              <select className="input-cita">
                <option value="">Seleccione un cliente</option>
                {clientes.map(c => (<option key={c.IdCliente} value={c.IdCliente}>{c.Nombre}{" "}{c.Apellido}</option>))}
              </select>

              <select className="input-cita">
                <option value="">Seleccione un empleado</option>
                {Empleados.map(e => (<option key={e.IdEmpleado} value={e.IdEmpleado}>{e.Nombre}{" "}{e.Apellido}</option>))}
              </select>

              <select
                className="input-cita"
                value={idServicioSeleccionado}
                onChange={manejarCambioServicio}
              >
                <option value="">Seleccione un servicio</option>
                {servicios.map(s => (<option key={s.IdServicio} value={s.IdServicio}>{s.Nombre}</option>))}
              </select>

              <input type="date" className="input-cita" />

              <input type="text" placeholder="Hora" className="input-cita" />

              <textarea
                placeholder="Descripción"
                className="input-cita textarea-cita"
              />

              <input
                type="text"
                placeholder="Precio total"
                className="input-cita"
                value={`RD$ ${precioTotal}`}
                readOnly
                onChange={(e) => setPrecioTotal(e.target.value === "" ? "" : Number(e.target.value))}
              />

              <select className="input-cita">
                <option value="">Seleccione un estado</option>
                <option>Pendiente</option>
                <option>Confirmada</option>
                <option>Cancelada</option>
                <option>Completada</option>
              </select>

              <div className="modal-acciones">
                <button
                  onClick={() => setMostrarFormulario(false)}
                  className="btn-cancelar"
                >
                  Cancelar
                </button>

                <button className="btn-guardar">Guardar Cita</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}