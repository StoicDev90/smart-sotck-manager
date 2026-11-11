class Modelo
{
    id = null;
    marca = null;
    nombre = '';

    constructor(obj) {
        for (var prop in obj) this[prop] = obj[prop];

        if(this.nombre == null) {
            this.nombre = ''
        }
    }
}

export default Modelo;