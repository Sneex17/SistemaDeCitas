import { Supabase } from '../services/Supabase';
import { type Cita } from '../services/Cita';

// 1. Obtener la lista completa de citas
export async function ListaCitas() {
  try {
    const { data, error } = await Supabase
      .from('cita')
      .select(`
        idcita,
        fecha,
        hora,
        descripcion,
        preciototal,
        idestado,
        cliente:idcliente (nombre, apellido),
        empleado:idempleado (nombre, apellido),
        estado:idestado (estado),
        citaservicio (
          servicios:idservicio (nombre)
        )
      `)
      .order('idcita', { ascending: false });

    if (error) throw error;

    return (data || []).map((item: any) => {
      // Extraemos el servicio desde el arreglo de la tabla intermedia citaservicio
      const servicioObj = item.citaservicio?.[0]?.servicios;

      return {
        idCita: item.idcita,
        cliente: item.cliente ? `${item.cliente.nombre} ${item.cliente.apellido}` : 'Desconocido',
        empleado: item.empleado ? `${item.empleado.nombre} ${item.empleado.apellido}` : 'Sin asignar',
        servicio: servicioObj ? servicioObj.nombre : 'Sin servicio',
        fecha: item.fecha,
        hora: item.hora,
        descripcion: item.descripcion || '',
        precioTotal: Number(item.preciototal) || 0,
        estado: item.estado?.estado || 'Desconocido',
        idEstado: item.idestado,
      };
    });
  } catch (err: any) {
    console.error('Error al listar citas:', err.message);
    return [];
  }
}

// 2. Insertar nueva cita y su relación en citaservicio
export async function AgregarNuevaCita(nuevaCita: Cita): Promise<boolean> {
  try {
    const { data: citaCreada, error: errorCita } = await Supabase
      .from('cita')
      .insert([
        {
          idcliente: nuevaCita.IdCliente,
          idempleado: nuevaCita.IdEmpleado,
          fecha: nuevaCita.Fecha,
          hora: nuevaCita.Hora,
          descripcion: nuevaCita.Descripcion || '',
          preciototal: nuevaCita.PrecioTotal,
          idestado: 2,
        },
      ])
      .select('idcita')
      .single();

    if (errorCita || !citaCreada) throw errorCita;

    // Insertar la relación en la tabla citaservicio
    const { error: errorServicio } = await Supabase
      .from('citaservicio')
      .insert([
        {
          idcita: citaCreada.idcita,
          idservicio: nuevaCita.IdServicio,
          precio: nuevaCita.PrecioTotal,
        },
      ]);

    if (errorServicio) throw errorServicio;

    return true;
  } catch (err: any) {
    console.error('Error al guardar la nueva cita:', err.message);
    return false;
  }
}

// 3. Cancelar cita (Cambiar estado a Cancelada - ID 4)
export async function CancelarCita(idCita: number): Promise<boolean> {
  try {
    const { error } = await Supabase
      .from('cita')
      .update({ idestado: 4 })
      .eq('idcita', idCita);

    if (error) throw error;
    return true;
  } catch (err: any) {
    console.error('Error al cancelar la cita:', err.message);
    return false;
  }
}

// Actualizar cita existente
export async function EditarCita(idCita: number, citaData: any): Promise<boolean> {
  try {
    const { error } = await Supabase
      .from('cita')
      .update({
        idcliente: citaData.IdCliente,
        idempleado: citaData.IdEmpleado,
        fecha: citaData.Fecha,
        hora: citaData.Hora,
        descripcion: citaData.Descripcion,
        preciototal: citaData.PrecioTotal,
        idestado: citaData.IdEstado,
      })
      .eq('idcita', idCita);

    if (error) throw error;
    return true;
  } catch (err: any) {
    console.error('Error al actualizar la cita:', err.message);
    return false;
  }
}