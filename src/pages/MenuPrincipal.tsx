interface MenuPrincipal {
  usuario: any
  onLogout: () => void
}

export function MenuPrincipal({ usuario, onLogout }: MenuPrincipal) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Panel Principal - Sistema de Citas</h1>
        <button onClick={onLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </header>

      <div style={{ backgroundColor: '#f4f4f4', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3>Bienvenido/a, {usuario.Empleado?.Nombre} {usuario.Empleado?.Apellido}</h3>
        <p><strong>Rol:</strong> {usuario.Empleado?.Rol?.Rol}</p>
        <p><strong>Correo:</strong> {usuario.email}</p>
      </div>

      <main>
        <h3>Módulos del Sistema</h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '1rem' }}>
          <li style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px' }}>📅 Gestión de Citas</li>
          <li style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px' }}>💇 Servicios</li>
          <li style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px' }}>👤 Clientes</li>
        </ul>
      </main>
    </div>
  )
}