export interface Cita{
    IdCIta?: number;
    IdCliente: number;
    IdEmpleado: number;
    IdServicio: number;
    Fecha: string;
    Hora: string;
    Descripcion?: string;
    PrecioTotal: number;
    IdEstado: number;
}