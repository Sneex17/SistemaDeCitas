import { Supabase } from '../services/Supabase'

export interface EmpleadoDetalle {
    IdEmpleado: number;
    Nombre: string;
    Apellido: string;
    Sexo: string;
    Nacionalidad: string;
    EstadoCivil: string;
    FechaNacimiento: string;
    Telefono: string;
    Direccion: string;
    Rol: string;
    Estado: string;
}

export async function ListaEmpleados(): Promise<EmpleadoDetalle[]> {
    try {
        const { data, error } = await Supabase
            .from('empleado')
            .select(`
                idempleado,
                nombre,
                apellido,
                sexo ( sexo ),
                nacionalidad ( nacionalidad ),
                fechanacimiento,
                estadocivil ( estadocivil ),
                telefono,
                direccion,
                rol ( rol ),
                estado ( estado )
            `);

        if (error) {
            throw error;
        }

        return (data ?? []).map((item: any) => ({
            IdEmpleado: item.idempleado,
            Nombre: item.nombre,
            Apellido: item.apellido,
            Sexo: Array.isArray(item.sexo) ? item.sexo[0]?.sexo : item.sexo?.sexo ?? '',
            Nacionalidad: Array.isArray(item.nacionalidad) ? item.nacionalidad[0]?.nacionalidad : item.nacionalidad?.nacionalidad ?? '',
            FechaNacimiento: item.fechanacimiento,
            EstadoCivil: Array.isArray(item.estadocivil) ? item.estadocivil[0]?.estadocivil : item.estadocivil?.estadocivil ?? '',
            Telefono: item.telefono,
            Direccion: item.direccion,
            Rol: Array.isArray(item.rol) ? item.rol[0]?.rol : item.rol?.rol ?? '',
            Estado: Array.isArray(item.estado) ? item.estado[0]?.estado : item.estado?.estado ?? '',
        }));

    } catch (err: any) {
        console.error('Error fetching empleados', err.message);
    }
    return [];
}