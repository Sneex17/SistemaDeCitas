import {type Sexo} from '../entities/Sexo'
import { Supabase } from '../services/Supabase'

export async function ListaSexos() : Promise<Sexo[]> {
    try{
        const {data, error} = await Supabase
        .from('sexo').select('idsexo, sexo');

        if(error){
            throw error;
        }

        return (data ?? []).map((item) => ({
            IdSexo: item.idsexo,
            Sexo: item.sexo,
        })) as Sexo[];

    }catch(err: any){
        console.error('Error fetching sexos:', err.message);
    }
    return [];
    
}