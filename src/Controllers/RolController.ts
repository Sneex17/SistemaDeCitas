import {type Rol} from '../entities/Rol'
import { Supabase } from '../services/Supabase'

export async function ListaRoles() : Promise<Rol[]> {
    try{
        const {data, error} = await Supabase
        .from('rol').select('idrol, rol');

        if(error){
            throw error;
        }

        return (data ?? []).map((item) => ({
            IdRol: item.idrol,
            Rol: item.rol,
        })) as Rol[];

    }catch(err: any){
        console.error('Error fetching roles:', err.message);
    }
    return [];
    
}