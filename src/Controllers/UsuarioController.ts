import { Supabase } from '../services/Supabase';

export interface ActualizarCuentaDTO {
  IdEmpleado: number;
  Nombre: string;
  Apellido: string;
  Email: string;
  Contrasena?: string;
}

export async function ActualizarCuentaUsuario(datos: ActualizarCuentaDTO): Promise<boolean> {
  try {
    if (!datos.IdEmpleado || isNaN(Number(datos.IdEmpleado))) {
      console.error('IdEmpleado no es un número válido:', datos.IdEmpleado);
      return false;
    }

    const idEmpleadoNum = Number(datos.IdEmpleado);

    // 1. Actualizar tabla empleado
    const { error: errorEmpleado } = await Supabase
      .from('empleado')
      .update({
        nombre: datos.Nombre,
        apellido: datos.Apellido,
      })
      .eq('idempleado', idEmpleadoNum);

    if (errorEmpleado) throw errorEmpleado;

    // 2. Actualizar tabla usuario
    if (datos.Contrasena && datos.Contrasena.trim() !== '') {
      const { error: errorUsuario } = await Supabase
        .from('usuario')
        .update({
          email: datos.Email,
          contrasena: datos.Contrasena,
        })
        .eq('idempleado', idEmpleadoNum);

      if (errorUsuario) throw errorUsuario;
    } else {
      const { error: errorUsuario } = await Supabase
        .from('usuario')
        .update({
          email: datos.Email,
        })
        .eq('idempleado', idEmpleadoNum);

      if (errorUsuario) throw errorUsuario;
    }

    return true;
  } catch (err: any) {
    console.error('Error al actualizar la cuenta:', err.message);
    return false;
  }
}