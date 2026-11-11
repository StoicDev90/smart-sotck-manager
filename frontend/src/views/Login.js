import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../services/ApiService.js'


export default function Login() {

    const [_nombreUsuario, setNombreUsuario] = useState('');
    const [_password, setPassword] = useState('');
    const [_cargando, setCargando] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        Auth.me().then(data => {
          if (data.authenticated) {
            navigate("/", { replace: true });
          }
        });
      }, []);

    async function iniciarSesion(e) {
        e.preventDefault();
        setError("");
        setCargando(true);
        try{
            await Auth.login(_nombreUsuario, _password);
            Auth.me().then(data => {
                if(data.authenticated) {
                    localStorage.setItem("user", JSON.stringify(data));
                }
            })
            navigate("/home");
        } catch (err){
            const data = err?.response?.data;
            if (data?.error === 'invalid_credentials') {
            setError('Usuario o contraseña incorrectos');
            } else if (data?.error === 'auth_service_unavailable') {
            setError('Servicio de autenticación no disponible');
            } else {
            setError('No se pudo iniciar sesión');
    }
        } finally {
            setCargando(false);
        }
    }

    return (
        <div className="container justify-content-center mt-5">
            <div className="container col-6">

                <h2 className="text-center my-5">Iniciar Sesion</h2>

                <form onSubmit = {(e) => iniciarSesion(e)}>
                    <div className = "row d-flex justify-content-center my-2">
                        <input value = {_nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} placeholder = "Nombre de usuario" />
                    </div>
                    <div className = "row d-flex justify-content-center my-2">
                        <input type="password" value = {_password} onChange={(e) => setPassword(e.target.value)} placeholder = "Contraseña" />
                    </div>
                    <div className = "row d-flex justify-content-end my-2">
                        <button 
                            type="submit" 
                            disabled = {_cargando} 
                            className="btn btn-success ms-5">
                            {_cargando ? "Ingresando..." : "Ingresar"}
                        </button>
                        
                    </div>
                    <div className='row'>
                        {error && <div style={{color:"crimson", marginTop:10}}>{error}</div>}
                    </div>
                </form>
            </div>
        </div>
    )
}