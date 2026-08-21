export interface Usuario{
    IdUsuario: number;
    IdEmpleado: number;
    email: string;
    contrasena: string;
    FechaCreacion: Date;
    UltimaSesion: Date;
    IdEstado: number;
}