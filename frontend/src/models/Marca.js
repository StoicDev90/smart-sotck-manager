class Marca
{
    id = null;
    nombre = '';

    constructor(obj) {
        for (var prop in obj) this[prop] = obj[prop];
        
        if(this.nombre == null) {
            this.nombre = '';
        }
    }
}

export default Marca;