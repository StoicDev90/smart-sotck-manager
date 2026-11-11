import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { hasAuthority } from "../constants/Permissions";
import { getUser } from "../services/AuthService";

export default function RequireAuth({children, permisos, requireAll = false}) {
    const location = useLocation();
    const user = getUser();

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    if (permisos) {
        const tienePermisos = requireAll
          ? permisos.every(p => hasAuthority(user, p)) // AND
          : permisos.some(p => hasAuthority(user, p)); // OR
    
        if (!tienePermisos) {
          return <Navigate to="/no-autorizado" replace state={{ from: location.pathname}}/>;
        }
      }

  return children;
}