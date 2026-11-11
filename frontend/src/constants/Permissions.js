import { getUser } from "../services/AuthService";

  export const hasAuthority = (user, permiso) => {
    return user?.authorities?.includes(permiso);
  };
  
  export const hasAnyAuthority = (user, permisos) => {
    return permisos.some(p => user?.authorities?.includes(p));
  }

  export const hasTipo = (user, tipo) => {
    return user?.tipos?.includes(tipo);
  }
  
  export const can = (permiso) => {
    const user = getUser();
    return hasAuthority(user, permiso);
  }
  
  export const canAny = (permisos) => {
    const user = getUser();
    return hasAnyAuthority(user, permisos);
  };

  export const canAnyRecurso = (permisos, tipo) => {
    const user = getUser();

    console.log(user);
    console.log(permisos);
    console.log(tipo);

    if (canAny(permisos)) {
      console.log("Tiene el permiso", permisos);
    } else {
      console.log("No tiene el permiso", permisos);
    }

    if(hasTipo(user, tipo)) {
      console.log("Tiene el tipo", tipo);
    } else {
      console.log("No tiene el tipo", tipo);
    }


    return canAny(permisos) && hasTipo(user, tipo);
  }