import {type Estado} from '../entities/Estado'
import { Supabase } from '../services/Supabase'

export async function ListaEstadosEmpleados() : Promise<Estado[]> {
    try{
        const {data, error} = await Supabase
        .from('estado').select('idestado, estado').range(0,1);

        if(error){
            throw error;
        }

        return (data ?? []).map((item) => ({
            IdEstado: item.idestado,
            Estado: item.estado,
        })) as Estado[];

    }catch(err: any){
        console.error('Error fetching estados:', err.message);
    }
    return []; 
}

export async function ListaEstadosCitas() : Promise<Estado[]> {
    try{
        const {data, error} = await Supabase
        .from('estado').select('idestado, estado').range(3,4);

        if(error){
            throw error;
        }

        return (data ?? []).map((item) => ({
            IdEstado: item.idestado,
            Estado: item.estado,
        })) as Estado[];

    }catch(err: any){
        console.error('Error fetching estados:', err.message);
    }
    return []; 
}