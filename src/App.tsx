import { useState, type FormEvent } from "react";
import { Supabase } from "./services/Supabase";
import { MenuPrincipal } from "./pages/MenuPrincipal"
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [usuarioLogueado, setUsuarioLogueado] = useState<any>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // 1. Validar las credenciales en la tabla usuario (todo en minúsculas)
      const { data: usuario, error: userError } = await Supabase
        .from("usuario")
        .select("*")
        .eq("email", email.trim())
        .eq("contrasena", password)
        .eq("idestado", 1)
        .maybeSingle();

      if (userError) throw userError;
      if (!usuario) {
        throw new Error("Credenciales incorrectas o usuario inactivo.");
      }

      // 2. Obtener los datos del empleado
      const { data: empleado } = await Supabase
        .from("empleado")
        .select("nombre, apellido, idrol")
        .eq("idempleado", usuario.idempleado)
        .single();

      // 3. Obtener el rol del empleado
      let nombreRol = "Sin Rol";
      if (empleado?.idrol) {
        const { data: rol } = await Supabase
          .from("rol")
          .select("rol")
          .eq("idrol", empleado.idrol)
          .single();
        if (rol) nombreRol = rol.rol;
      }

      // 4. Actualizar la fecha de última sesión
      await Supabase
        .from("usuario")
        .update({ ultimasesion: new Date().toISOString().split("T")[0] })
        .eq("idusuario", usuario.idusuario);

      // Guardar en el estado para mostrar la pantalla de bienvenida
      setUsuarioLogueado({
        ...usuario,
        Empleado: {
          Nombre: empleado?.nombre,
          Apellido: empleado?.apellido,
          Rol: { Rol: nombreRol },
        },
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  if (usuarioLogueado) {
    return (
      <MenuPrincipal 
        usuario={usuarioLogueado} 
        onLogout={() => setUsuarioLogueado(null)} 
      />
    )
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Sistema de Citas</h2>
          <p>Ingresa tus credenciales para acceder al panel</p>
        </div>

        {errorMsg && <div className="error-banner">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
