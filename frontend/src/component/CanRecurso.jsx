import { canAnyRecurso } from "./Permissions";

const CanRecurso = ({ permisos, tipo, children }) => {
    return canAnyRecurso(permisos, tipo) ? children : null;
}

export default CanRecurso;