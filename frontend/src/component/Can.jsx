import { canAny } from "../constants/Permissions";

const Can = ({ permisos, children }) => {
  return canAny(permisos) ? children : null;
};

export default Can;