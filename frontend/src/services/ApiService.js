import { api, ensureCsrf } from "./Http.js";
import Marca from "../models/Marca";
import Modelo from "../models/Modelo";
import Recurso from "../models/Recurso";
import Datos_celular from "../models/Datos_celular";
import Datos_cpu from "../models/Datos_cpu";
import Datos_monitor from "../models/Datos_monitor";
import Asignacion from '../models/Asignacion';
import Usuario from "../models/Usuario.js";
import { logout as clearUser } from "./AuthService.js";

export const Auth = {
    login: async function(usuario, password) {
        await ensureCsrf();
        return api.post("/auth/login", { usuario, password })
            .then(res => res.data)
    },
    me: function() {
        return api.get("/auth/me")
            .then(res => res.data)
            .catch(error => {console.log(error)});
    },
    logout: function() {
        return api.post("/logout")
            .then(res => res.data)
            .catch(error => {console.log(error)})
            .finally(clearUser());
    }
};

export const Api = {
    postMarcas: function (data) {
        const marca = new Marca(data);
        return api.post('/marca', marca)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            })   
    },
    putMarcas: function (data) {
        const marca = new Marca(data);
        return api.put('/marca', marca)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            })
    },
    deleteMarcas: function (id) {
        return api.delete('/marca/' + id)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            })
    },
    postModelos: function (data) {
        const modelo = new Modelo(data);
        return api.post('/modelo', modelo)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            })   
    },
    putModelos: function (data) {
        const modelo = new Modelo(data);
        return api.put('/modelo', modelo)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            })   
    },
    deleteModelos: function (id) {
        return api.delete('/modelos/' + id)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
            })
    },
    deleteRecurso: function(id) {
        return api.delete('/recurso/' + id)
            .then ((response) => {
                return response;
            })
            .catch ((error) => {
                console.log(error);
            });
    },
    getRecurso: function (id) {
        return api.get('/recurso/' + id)
            .then ((response) => {
                return response.data;
            })
            .catch ((error) => {
                console.log(error);
            });
    },
    get: function(modelo) {
        return api.get('/' + modelo)
            .then ((response) => {
                return response.data;
            })
            .catch ((error) => {
                alert("Error al obtener recursos");
                console.log(error)
            });
    },
    postCelular: function(celular, recurso) {
        const _celular = new Datos_celular(celular);
        const _recurso = new Recurso(recurso);
        _celular.setRecurso(_recurso)
        return api.post('/celular', _celular)
            .then ((response) => {
                alert("Celular guardado correctamente");
                return response;
            })
            .catch ((error) => {
                console.log(error);
                alert("Error al guardar celular");
            })
        
    },
    deleteCelular: function (id) {
        return api.delete('/celular/' + id)
            .then((response) => {
                alert(response.data);
                return response;
            })
            .catch ((error) => {
                alert("Error al eliminar celular");
                console.log(error);
            });
    },
    postComputadora: function(computadora, recurso) {
        const _computadora = new Datos_cpu(computadora);
        const _recurso = new Recurso(recurso);
        _computadora.setRecurso(_recurso);
        return api.post('/computadora', _computadora)
            .then((response) => {
                alert("Computadora guardada correctamente");
                return response;
            })
            .catch ((error) => {
                console.log(error);
                alert("Error al guardar computadora");
            });
    },
    deleteComputadora: function (id) {
        return api.delete('/computadora/' + id)
            .then((response) => {
                alert("Computadora eliminada correctamente");
                return response;
            })
            .catch ((error) => {
                alert("Error al eliminar la computadora");
                console.log(error);
            });
    },
    postMonitor: function(monitor, recurso) {
        const _monitor = new Datos_monitor(monitor);
        const _recurso = new Recurso(recurso);
        _monitor.setRecurso(_recurso);
        return api.post('/monitor', _monitor)
            .then((response) => {
                alert("Monitor guardado correctamente")
                return response;
            })
            .catch ((error) => {
                alert("Error al guardar el monitor");
                console.log(error);
            });
    },
    guardarMonitor: async function (payload) {
        try {
            const response = payload.id_monitor
                ? await api.post('/monitor/' + payload.id_monitor + '/editar', payload)
                : await api.post('/monitor', payload);
            return response.data;
        } catch (error) {
            console.error('Error guardarMonitor:', error.response ? error.response.data : error);
            throw error;
        }
    },
    guardarCelular: async function (payload) {
        try {
            const response = payload.id_celular
                ? await api.post('/celular/' + payload.id_celular + '/editar', payload)
                : await api.post('/celular', payload);
            return response.data;
        } catch (error) {
            console.error('Error guardarCelular:', error.response ? error.response.data : error);
            throw error;
        }
    },
    guardarComputadora: async function (payload) {
        try {
            const response = payload.id_cpu
                ? await api.post('/computadora/' + payload.id_cpu + '/editar', payload)
                : await api.post('/computadora', payload);
            return response.data;
        } catch (error) {
            console.error('Error guardarComputadora:', error.response ? error.response.data : error);
            throw error;
        }
    },
    guardarLicencia: async function (payload) {
        try {
            const response = payload.id_licencia
                ? await api.post('/licencia/' + payload.id_licencia + '/editar', payload)
                : await api.post('/licencia', payload);
            return response.data;
        } catch (error) {
            console.error('Error guardarLicencia:', error.response ? error.response.data : error);
            throw error;
        }
    },
    deleteLicencia: function(id) {
        return api.delete('/licencia/' + id)
            .then((response) => {
                alert("Licencia eliminada correctamente");
                return response;
            })
            .catch ((error) => {
                console.log(error);
                alert("Error al eliminar la licencia");
            });
    },
    bajaRecurso: function (id, motivo) {
        return api.post('/recurso/' + id + '/baja', {motivo});
    },
    altaRecurso: function (id, motivo) {
        return api.post('/recurso/' + id + '/alta', {motivo});
    },
    deleteMonitor: function (id) {
        return api.delete('/monitor/' + id)
            .then((response) => {
                alert("Monitor eliminado correctamente");
                return response;
            })
            .catch ((error) => {
                console.log(error);
                alert("Error al eliminar el monitor");
            });
    },
    getAsignacion: function(id){
        return api.get('/asignacion/' + id)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                alert('error al leer asignacion');
                console.log(error);
            });
    },
    putRecurso: function(data) {
        const recurso = new Recurso(data);
        return api.put('/recurso', recurso)
            .then((response) => {
                alert('Recurso modificado correctamente');
                return response;
            })
            .catch((error) => {
                alert('Error al modificar recurso');
                console.log(error);
            });
    },
    putAsignacion: function(data) {
        const asignacion = new Asignacion(data);
        return api.put('/asignacion', asignacion)
            .then((response) => {
                alert('Asignacion modificada correctamente');
                return response;
            })
            .catch((error) => {
                alert('error al modificar asignacion');
                console.log(error);
            })
    },
    asignarRecurso: async function (payload) {
        const response = await api.post('/asignacion', payload);
        return response.data;
    },
    bajaAsignacion: async function (id) {
        const response = await api.post('/asignacion/' + id + '/baja');
        return response.data;
    },
    getComputadora: function (id) {
        return api.get('/computadora/' + id)
            .then ((response) => {
                return response.data;
            })
            .catch ((error) => {
                alert("Error al obtener la computadora");
                console.log(error);
            })
    },
    getCelular: function (id) {
        return api.get('/celular/' + id)
            .then ((response) => {
                return response.data;
            })
            .catch ((error) => {
                alert("Error al obtener el celular");
                console.log(error);
            })
    },
    getMonitor: function (id) {
        return api.get('/monitor/' + id)
            .then ((response) => {
                return response.data;
            })
            .catch ((error) => {
                alert("Error al obtener el monitor");
                console.log(error);
            })
    },
    getLicencia: function (id) {
        return api.get('/licencia/' + id)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                alert("Error al obtener la licencia");
                console.log(error);
            });
    },
    putCelular: function(celular, recurso) {
        const _celular = new Datos_celular(celular);
        const _recurso = new Recurso(recurso);
        _celular.setRecurso(_recurso);
        return api.put('/celular', _celular)
            .then((response) => {
                alert ("Celular modificado correctamente");
                return response;
            })
            .catch ((error) => {
                alert("Error al modificar el celular");
                console.log(error);
            });
    },
    putMonitor: function(monitor, recurso) {
        const _monitor = new Datos_monitor(monitor);
        const _recurso = new Recurso(recurso);
        _monitor.setRecurso(_recurso);
        return api.put('/monitor', _monitor)
            .then((response) => {
                alert ("Monitor modificado correctamente");
                return response;
            })
            .catch ((error) => {
                alert("Error al modificar el monitor");
                console.log(error);
            });
    },
    putComputadora: function(computadora, recurso) {
        const _computadora = new Datos_cpu(computadora);
        const _recurso = new Recurso(recurso);
        _computadora.setRecurso(_recurso);
        return api.put('/computadora', _computadora)
            .then((response) => {
                alert ("Computadora modificada correctamente");
                return response;
            })
            .catch ((error) => {
                alert("Error al modificar la computadora");
                console.log(error);
            });
    },
    postUsuario: function(usuario) {
        const _usuario = new Usuario(usuario);
        return api.post('/usuario', _usuario)
            .then((response) => {
                alert ("Usuario creado correctamente");
                return response
            })
            .catch((error) => {
                alert("Error al crear usuario");
                console.log(error);
            })
    },
    putUsuario: function(usuario) {
        console.log('putUSuario');
        const _usuario = new Usuario(usuario);
        
        return api.put('/usuario', _usuario)
            .then((response) => {
                alert ("Usuario modificado correctamente");
                return response;
            })
            .catch ((error) => {
                alert("Error al modificar usuario");
                console.log(error);
            });
    },
    getUsuario: function (id) {
        return api.get('/usuario/' + id)
            .then ((response) => {
                return response.data;
            })
            .catch ((error) => {
                alert("Error al obtener el usuario");
                console.log(error);
            })
    },
    deleteUsuario: async function (id) {
        const response = await api.delete('/usuario/' + id)
        return response.data
    },
    crearRol: async function (payload) {
        const response = await api.post('/rol', payload);
        return response.data;
    },
    getRol: async function(id) {
        return api.get('/rol/' + id)
            .then((response) => {
                return response.data;
            })
            .catch ((error) => {
                console.error(error);
                alert("Error al obtener el rol");
            })
    },
    crearPrivilegio: async function (payload) {
        const response = await api.post('/privilegio', payload);
        return response.data;
    },
    eliminarRol: async function (id) {
        const response = await api.delete('/rol/' + id);
        return response.data;
    },
    eliminarPrivilegio: async function (id) {
        const response = await api.delete('/privilegio/' + id);
        return response.data;
    },
    asignarPrivilegios: async function (id, privilegios) {
        const response = await api.post('/rol/' + id + '/privilegios', privilegios)
        return response.data;
    },
    asignarTipoRol: async function (id, tipos) {
        const response = await api.post('/rol/' + id + '/tipos', tipos)
        return response.data;
    },
    getMarca: async function(id) {
        return api.get('/marca/' + id)
            .then ((response) => {
                return response.data;
            })
            .catch((error) => {
                alert("Error al obtener la marca");
                console.log(error);
            })
    }
}
