import { Link } from "react-router-dom";

interface MenuPrincipalProps {
  usuario: any;
  onLogout: () => void;
}

export function MenuPrincipal({ usuario, onLogout }: MenuPrincipalProps) {
  // Extraemos el ID del Rol (se evalúan distintas estructuras comunes)
  const idRol =
    usuario.Empleado?.IdRol ??
    usuario.Empleado?.Rol?.IdRol ??
    usuario.IdRol ??
    0;

  return (
    <div className="menu-container">
      <header className="menu-header">
        <div className="menu-title">
          <span className="menu-subtitle">SISTEMA DE CITAS</span>
          <h1>Panel Principal</h1>
          <p>Administra y controla las operaciones del sistema.</p>
        </div>

        <div className="menu-header-actions">
          <Link to="/gestionar-cuenta" className="btn-gestionar-cuenta">
            ⚙️ Gestionar cuenta
          </Link>

          <button onClick={onLogout} className="btn-cerrar-sesion">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <section className="usuario-card">
        <div className="usuario-avatar">
          {usuario.Empleado?.Nombre?.charAt(0)}
          {usuario.Empleado?.Apellido?.charAt(0)}
        </div>

        <div className="usuario-info">
          <span className="usuario-bienvenida">Bienvenido/a</span>

          <h2>
            {usuario.Empleado?.Nombre} {usuario.Empleado?.Apellido}
          </h2>

          <div className="usuario-detalles">
            <span>
              <strong>Rol:</strong> {usuario.Empleado?.Rol?.Rol}
            </span>

            <span>
              <strong>Correo:</strong> {usuario.email}
            </span>
          </div>
        </div>
      </section>

      <main>
        <div className="modulos-header">
          <div>
            <h2>Módulos del Sistema</h2>
            <p>Selecciona una opción para comenzar a trabajar.</p>
          </div>
        </div>

        <div className="modulos-grid">
          {/* Citas: visible para Rol 1, 2 y 3 */}
          {(idRol === 1 || idRol === 2 || idRol === 3) && (
            <Link to="/citas" className="modulo-card">
              <div className="modulo-icon">📅</div>
              <div className="modulo-content">
                <h3>Gestión de Citas</h3>
                <p>Administra, consulta y controla las citas registradas.</p>
              </div>
              <span className="modulo-arrow">→</span>
            </Link>
          )}

          {/* Empleados: solo disponible para Rol 1 */}
          {idRol === 1 && (
            <Link to="/empleados" className="modulo-card">
              <div className="modulo-icon">👨‍💼</div>
              <div className="modulo-content">
                <h3>Gestión de Empleados</h3>
                <p>
                  Administra, consulta y controla la información de los
                  empleados.
                </p>
              </div>
              <span className="modulo-arrow">→</span>
            </Link>
          )}

          {/* Servicios: solo disponible para Rol 1 */}
          {idRol === 1 && (
            <Link to="/servicios" className="modulo-card">
              <div className="modulo-icon">💇</div>
              <div className="modulo-content">
                <h3>Servicios</h3>
                <p>Gestiona los servicios disponibles y sus precios.</p>
              </div>
              <span className="modulo-arrow">→</span>
            </Link>
          )}

          {/* Clientes: visible para Rol 1 y Rol 2 */}
          {(idRol === 1 || idRol === 2) && (
            <Link to="/clientes" className="modulo-card">
              <div className="modulo-icon">👤</div>
              <div className="modulo-content">
                <h3>Clientes</h3>
                <p>Consulta y administra la información de los clientes.</p>
              </div>
              <span className="modulo-arrow">→</span>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}