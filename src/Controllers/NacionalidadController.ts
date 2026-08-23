import {type Nacionalidad} from '../entities/Nacionalidad'
import { Supabase } from '../services/Supabase'

export async function ListaNacionalidades() : Promise<Nacionalidad[]> {
    try{
        const {data, error} = await Supabase
        .from('nacionalidad').select('idnacionalidad, nacionalidad');

        if(error){
            throw error;
        }

        return (data ?? []).map((item) => ({
            IdNacionalidad: item.idnacionalidad,
            Nacionalidad: item.nacionalidad,
        })) as Nacionalidad[];

    }catch(err: any){
        console.error('Error fetching nacionalidades:', err.message);
    }
    return [];
    
}