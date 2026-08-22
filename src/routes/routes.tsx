import { Routes, Route, Navigate } from "react-router-dom";
import { MenuPrincipal } from "../pages/MenuPrincipal";
import Citas from "../pages/Citas/citas";
import GestionarCuenta from "../pages/GestionCuenta/GestionarCuenta";
import Clientes from "../pages/Clientes/clientes";
import GestionEmpleados from "../pages/gestionEmpleados/gestionEmpleados";
// import Servicios from "../pages/Servicios";


interface AppRoutesProps {
  usuario: any;
  onLogout: () => void;
}

export function AppRoutes({ usuario, onLogout }: AppRoutesProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={<MenuPrincipal usuario={usuario} onLogout={onLogout} />}
      />

      <Route path="/citas" element={<Citas />} />

     
      <Route
        path="/gestionar-cuenta"
        element={<GestionarCuenta usuario={usuario} />}
      />
      {/* <Route path="/servicios" element={<Servicios />} /> */}
       <Route path="/clientes" element={<Clientes />} /> 
       <Route path="/empleados" element={<GestionEmpleados />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
