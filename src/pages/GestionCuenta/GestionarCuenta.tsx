import { useState } from "react";
import "./gestionCuenta.css";

interface GestionarCuentaProps {
  usuario: any;
}

export default function GestionarCuenta({
  usuario,
}: GestionarCuentaProps) {
  const [nombre, setNombre] = useState(
    usuario?.Empleado?.Nombre || ""
  );

  const [apellido, setApellido] = useState(
    usuario?.Empleado?.Apellido || ""
  );

  const [email, setEmail] = useState(
    usuario?.email || ""
  );

  const [nuevaContrasena, setNuevaContrasena] =
    useState("");

  const [confirmarContrasena, setConfirmarContrasena] =
    useState("");

  const [mensaje, setMensaje] = useState("");

  const handleGuardar = () => {
    if (
      nuevaContrasena &&
      nuevaContrasena !== confirmarContrasena
    ) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    setMensaje("Los cambios se guardaron correctamente.");
  };

  return (
    <div className="cuenta-container">
      <div className="cuenta-card">
        <div className="cuenta-header">
          <div>
            <h1>Gestionar cuenta</h1>

            <p>
              Administra la información de tu cuenta.
            </p>
          </div>
        </div>

        {mensaje && (
          <div className="cuenta-mensaje">
            {mensaje}
          </div>
        )}

        <div className="cuenta-form">
          <div className="cuenta-section">
            <h3>Información personal</h3>

            <div className="cuenta-grid">
              <div className="cuenta-field">
                <label htmlFor="nombre">
                  Nombre
                </label>

                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) =>
                    setNombre(e.target.value)
                  }
                />
              </div>

              <div className="cuenta-field">
                <label htmlFor="apellido">
                  Apellido
                </label>

                <input
                  id="apellido"
                  type="text"
                  value={apellido}
                  onChange={(e) =>
                    setApellido(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="cuenta-field">
              <label htmlFor="email">
                Correo electrónico
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div className="cuenta-field">
              <label>Rol</label>

              <input
                type="text"
                value={
                  usuario?.Empleado?.Rol?.Rol ||
                  "Sin Rol"
                }
                disabled
              />
            </div>
          </div>

          <div className="cuenta-section">
            <h3>Cambiar contraseña</h3>

            <div className="cuenta-field">
              <label htmlFor="nuevaContrasena">
                Nueva contraseña
              </label>

              <input
                id="nuevaContrasena"
                type="password"
                placeholder="Ingrese una nueva contraseña"
                value={nuevaContrasena}
                onChange={(e) =>
                  setNuevaContrasena(e.target.value)
                }
              />
            </div>

            <div className="cuenta-field">
              <label htmlFor="confirmarContrasena">
                Confirmar contraseña
              </label>

              <input
                id="confirmarContrasena"
                type="password"
                placeholder="Repita la nueva contraseña"
                value={confirmarContrasena}
                onChange={(e) =>
                  setConfirmarContrasena(e.target.value)
                }
              />
            </div>
          </div>

          <div className="cuenta-actions">
            <button
              type="button"
              onClick={() => window.history.back()}
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