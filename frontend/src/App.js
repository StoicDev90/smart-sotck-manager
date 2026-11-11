import { Routes, Route, Navigate } from "react-router-dom";
import CargarEquipo from './views/CargarEquipo';
import VerEquipos from "./views/VerEquipos";
import VerEquiposBaja from "./views/VerEquiposBaja";
import CargarModelo from "./views/CargarModelo";
import CargarMarca from "./views/CargarMarca";
import Home from "./views/Home";
import Login from './views/Login';
import RequireAuth from "./component/RequireAuth";
import Layout from "./component/Layout";
import Usuarios from "./views/Usuarios";
import Privilegios from "./views/Privilegios";
import Roles from "./views/Roles";
import NoAutorizado from "./views/NoAutorizado";

export default function App() {
  return (
    <Routes>
      {/* Pública */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas con layout común */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<VerEquipos />} />

        <Route
          path="cargarequipo"
          element={
            <RequireAuth permisos={["RECURSO_CREAR"]}>
              <CargarEquipo />
            </RequireAuth>}
        />

        <Route
          path="cargarmarca"
          element={
            <RequireAuth permisos={["MARCA_LEER"]}>
              <CargarMarca />
            </RequireAuth>}
        />

        <Route
          path="verequipos"
          element={
            <RequireAuth permisos={["RECURSO_LEER"]}>
              <VerEquipos />
            </RequireAuth>
          }
        />

        <Route
          path="verequiposbaja"
          element={
            <RequireAuth permisos={["RECURSO_LEER"]}>
              <VerEquiposBaja />
            </RequireAuth>
          }
        />

        <Route
          path="cargarmodelo"
          element={
            <RequireAuth RequireAuth permisos={["MODELO_LEER"]}>
              <CargarModelo />
            </RequireAuth>}
        />

        <Route
          path="usuarios"
          element={
            <RequireAuth RequireAuth permisos={["USUARIO_LEER"]}>
              <Usuarios />
            </RequireAuth>
          }
        />

        <Route
          path="privilegios"
          element={
            <RequireAuth RequireAuth permisos={["PRIVILEGIO_LEER"]}>
              <Privilegios />
            </RequireAuth>
          }
        />

        <Route
          path="roles"
          element={
            <RequireAuth RequireAuth permisos={["ROL_LEER"]}>
              <Roles />
            </RequireAuth>
          }
        />
        <Route path="/no-autorizado" element={<NoAutorizado />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}