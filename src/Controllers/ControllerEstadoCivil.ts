import {type EstadoCivil} from '../entities/EstadoCivil'
import { Supabase } from '../services/Supabase'

export async function ListaEstadoCivil() : Promise<EstadoCivil[]> {
    try{
        const {data, error} = await Supabase
        .from('estadocivil').select('idestadocivil, estadocivil');

        if(error){
            throw error;
        }

        return (data ?? []).map((item) => ({
            IdEstadoCivil: item.idestadocivil,
            EstadoCivil: item.estadocivil,
        })) as EstadoCivil[];

    }catch(err: any){
        console.error('Error fetching estados civiles:', err.message);
    }
    return [];
    
}