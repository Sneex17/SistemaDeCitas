import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./gestionCuenta.css";
import { ActualizarCuentaUsuario } from "../../Controllers/UsuarioController";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alertas = withReactContent(Swal);

interface GestionarCuentaProps {
  usuario: any;
  onActualizarUsuario?: (nuevoUsuario: any) => void;
}

export default function GestionarCuenta({
  usuario,
  onActualizarUsuario,
}: GestionarCuentaProps) {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState(
    usuario?.Empleado?.Nombre || usuario?.Empleado?.nombre || ""
  );
  const [apellido, setApellido] = useState(
    usuario?.Empleado?.Apellido || usuario?.Empleado?.apellido || ""
  );
  const [email, setEmail] = useState(usuario?.email || usuario?.Email || "");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const handleGuardar = async () => {
    if (!nombre.trim() || !apellido.trim() || !email.trim()) {
      Alertas.fire({
        title: "Campos requeridos",
        text: "Por favor complete el nombre, apellido y correo.",
        icon: "warning",
      });
      return;
    }

    if (nuevaContrasena && nuevaContrasena !== confirmarContrasena) {
      Alertas.fire({
        title: "Contraseñas no coinciden",
        text: "La nueva contraseña y la confirmación deben ser iguales.",
        icon: "error",
      });
      return;
    }

    // Asegurar extracción del IdEmpleado
    const rawIdEmpleado =
      usuario?.Empleado?.IdEmpleado ??
      usuario?.Empleado?.idempleado ??
      usuario?.IdEmpleado ??
      usuario?.idempleado;

    const idEmpleadoNum = Number(rawIdEmpleado);

    if (!idEmpleadoNum || isNaN(idEmpleadoNum)) {
      Alertas.fire({
        title: "Error",
        text: "No se pudo identificar el ID del empleado.",
        icon: "error",
      });
      return;
    }

    const payload = {
      IdEmpleado: idEmpleadoNum,
      Nombre: nombre,
      Apellido: apellido,
      Email: email,
      Contrasena: nuevaContrasena,
    };

    const exito = await ActualizarCuentaUsuario(payload);

    if (exito) {
      Alertas.fire({
        title: "¡Éxito!",
        text: "Los cambios se guardaron correctamente.",
        icon: "success",
      });

      if (onActualizarUsuario) {
        onActualizarUsuario({
          ...usuario,
          email: email,
          Empleado: {
            ...usuario?.Empleado,
            Nombre: nombre,
            Apellido: apellido,
            nombre: nombre,
            apellido: apellido,
          },
        });
      }

      setNuevaContrasena("");
      setConfirmarContrasena("");
    } else {
      Alertas.fire({
        title: "Error",
        text: "No se pudieron guardar los cambios en la cuenta.",
        icon: "error",
      });
    }
  };

  return (
    <div className="cuenta-container">
      <div className="cuenta-card">
        <div className="cuenta-header">
          <div>
            <h1>Gestionar cuenta</h1>
            <p>Administra la información de tu cuenta.</p>
          </div>
        </div>

        <div className="cuenta-form">
          <div className="cuenta-section">
            <h3>Información personal</h3>

            <div className="cuenta-grid">
              <div className="cuenta-field">
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="cuenta-field">
                <label htmlFor="apellido">Apellido</label>
                <input
                  id="apellido"
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
            </div>

            <div className="cuenta-field">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="cuenta-field">
              <label>Rol</label>
              <input
                type="text"
                value={
                  usuario?.Empleado?.Rol?.Rol ||
                  usuario?.Empleado?.Rol ||
                  usuario?.Empleado?.rol ||
                  "Sin Rol"
                }
                disabled
              />
            </div>
          </div>

          <div className="cuenta-section">
            <h3>Cambiar contraseña</h3>

            <div className="cuenta-field">
              <label htmlFor="nuevaContrasena">Nueva contraseña</label>
              <input
                id="nuevaContrasena"
                type="password"
                placeholder="Ingrese una nueva contraseña"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
              />
            </div>

            <div className="cuenta-field">
              <label htmlFor="confirmarContrasena">Confirmar contraseña</label>
              <input
                id="confirmarContrasena"
                type="password"
                placeholder="Repita la nueva contraseña"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
              />
            </div>
          </div>

          <div className="cuenta-actions">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-cuenta-volver"
            >
              Volver
            </button>

            <button
              type="button"
              onClick={handleGuardar}
              className="btn-cuenta-guardar"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}