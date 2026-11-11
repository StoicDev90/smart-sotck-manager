class Usuario
{
    id_usuario = null;
    nombre = '';
    login = '';
    habilitado = null;
    roles = [];

    constructor(obj) {
        for (var prop in obj) this[prop] = obj[prop];
    }
}

export default Usuario;