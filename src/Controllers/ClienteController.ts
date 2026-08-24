import { Supabase } from '../services/Supabase';
import { type Cliente } from '../entities/Cliente';

export interface ClienteDetalle {
  IdCliente: number;
  Nombre: string;
  Apellido: string;
  Sexo: string;
  Nacionalidad: string;
  FechaNacimiento: string;
  Telefono: string;
  Email: string;
  Direccion: string;
  Estado: string;
}

export async function ListaClientes(): Promise<ClienteDetalle[]> {
  try {
    const { data, error } = await Supabase
      .from('cliente')
      .select(`
                idcliente,
                nombre,
                apellido,
                sexo ( sexo ),
                nacionalidad ( nacionalidad ),
                fechanacimiento,
                telefono,
                email,
                direccion,
                estado ( estado )
            `);

    if (error) {
      throw error;
    }

    return (data ?? []).map((item: any) => ({
      IdCliente: item.idcliente,
      Nombre: item.nombre,
      Apellido: item.apellido,
      Sexo: Array.isArray(item.sexo) ? item.sexo[0]?.sexo : item.sexo?.sexo ?? '',
      Nacionalidad: Array.isArray(item.nacionalidad) ? item.nacionalidad[0]?.nacionalidad : item.nacionalidad?.nacionalidad ?? '',
      FechaNacimiento: item.fechanacimiento,
      Telefono: item.telefono,
      Email: item.email,
      Direccion: item.direccion,
      Estado: Array.isArray(item.estado) ? item.estado[0]?.estado : item.estado?.estado ?? '',
    }));

  } catch (err: any) {
    console.error('Error fetching clientes', err.message);
  }
  return [];
}

export async function GuardarCliente(cliente: Cliente): Promise<boolean> {
  try {
    if (cliente.IdCliente == 0) {
      const { error } = await Supabase
        .from('cliente')
        .insert([
          {
            nombre: cliente.Nombre,
            apellido: cliente.Apellido,
            idsexo: cliente.IdSexo,
            idnacionalidad: cliente.IdNacionalidad,
            fechanacimiento: cliente.FechaNacimiento,
            telefono: cliente.Telefono,
            direccion: cliente.Direccion,
            email: cliente.Email,
            contrasena: cliente.Contrasena,
            idestado: cliente.IdEstado,
          },
        ]);

      if (error) {
        throw error;
      }
    } else {
      const { error } = await Supabase
        .from('cliente')
        .update({
          nombre: cliente.Nombre,
          apellido: cliente.Apellido,
          idsexo: cliente.IdSexo,
          idnacionalidad: cliente.IdNacionalidad,
          fechanacimiento: cliente.FechaNacimiento,
          telefono: cliente.Telefono,
          direccion: cliente.Direccion,
          email: cliente.Email,
          contrasena: cliente.Contrasena,
          idestado: cliente.IdEstado,
        })
        .eq('idcliente', cliente.IdCliente);

      if (error) throw error;
    }


    return true;

  } catch (err: any) {
    console.error('Error al guardar cliente:', err.message);
    return false;
  }
}

export async function DesactivarCliente(idcliente: number): Promise<boolean> {
  try {
    const { error } = await Supabase
      .from('cliente')
      .update({ idestado: 2 })
      .eq('idcliente', idcliente);

    if (error) throw error;
    return true;
  } catch (err: any) {
    console.error('Error al inactivar cliente:', err.message);
    return false;
  }
}