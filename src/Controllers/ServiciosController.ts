import { type Servicios } from '../services/Servicios';
import { Supabase } from '../services/Supabase'

export interface ServicioDetalle {
    IdServicio: number;
    Nombre: string;
    Precio: number;
    Estado: string;
}

export async function ListaServicio(): Promise<ServicioDetalle[]> {
    try {
        const { data, error } = await Supabase
            .from('servicios')
            .select(`
        idservicio, 
        nombre, 
        precio, 
        estado ( estado )
      `);

        if (error) throw error;

        return (data ?? []).map((item: any) => {
            // Extrae el valor sin importar si Supabase lo devuelve como objeto, array o string directo
            let nombreEstado = '';

            if (typeof item.estado === 'string') {
                nombreEstado = item.estado;
            } else if (Array.isArray(item.estado) && item.estado.length > 0) {
                nombreEstado = item.estado[0]?.estado ?? '';
            } else if (item.estado && typeof item.estado === 'object') {
                nombreEstado = item.estado.estado ?? '';
            }
            return {
                IdServicio: item.idservicio,
                Nombre: item.nombre,
                Precio: item.precio,
                Estado: nombreEstado,
            };
        }) as ServicioDetalle[];

    } catch (err: any) {
        console.error('Error fetching servicio:', err.message);
    }
    return [];
}

export async function GuardarServicio(servicio: Servicios): Promise<boolean> {

    try {
        if (servicio.IdServicio == 0) {
            const { error } = await Supabase
                .from("servicios")
                .insert([
                    {
                        nombre: servicio.Nombre,
                        precio: servicio.Precio,
                        idestado: servicio.IdEstado,
                    },
                ]);

            if (error) {
                console.error("Error al insertar servicio:", error.message);
                return false;
            }
        } else {
            const { error } = await Supabase
                .from('servicios')
                .update({
                    nombre: servicio.Nombre,
                    precio: servicio.Precio,
                    idestado: servicio.IdEstado,
                })
                .eq('idservicio', servicio.IdServicio);

            if (error) throw error;
        }


        return true;
    } catch (err) {
        console.error("Error inesperado:", err);
        return false;
    }
};

export async function DesactivarServicio(idservicio: number): Promise<boolean> {
    try {
        const { error } = await Supabase
            .from('servicios')
            .update({ idestado: 2 })
            .eq('idservicio', idservicio);

        if (error) throw error;
        return true;
    } catch (err: any) {
        console.error('Error al inactivar servicio:', err.message);
        return false;
    }
}