import { Link, Outlet, useNavigate } from "react-router-dom";
import { Auth } from "../services/ApiService";
import '../App.css';
import { useEffect, useState } from "react";
import Can from "./Can";
import logo from '../assets/imagenes/logo.svg';

export default function Layout() {

    const [_usuario, setUsuario] = useState(null);

    useEffect(() => {
        leerUsuario();
    }, []);

    const navigate = useNavigate();

    async function leerUsuario() {
        let me = await Auth.me();
        console.log(me);
        setUsuario(me.fullname);
    }

    async function logout(e) {
        e.preventDefault();
        await Auth.logout();
        navigate("/login");
    }
    return (
        <div>
            <div className="">
                <div className=" container-fluid nav-color">
                    <nav className="navbar navbar-expand-lg nav-color">
                        <div className="container-fluid">
                            <div className="col-lg-2 col-sm-4 me-5 ">
                                <Link to="/" className="logo"><img className="logo" src={logo} alt="Smart Stock Manager" /> </Link>
                            </div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon bi-list"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <ul className="navbar-nav">
                                    <li className="item">
                                        <Link className="nav-link text-reset" to="/">Inicio</Link>
                                    </li>

                                    <li className="nav-item dropdown item">
                                        <a className="nav-link dropdown-toggle text-reset" href="/#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Equipos
                                        </a>
                                        <ul className="dropdown-menu color" aria-labelledby="navbarDropdownMenuLink">
                                            <Can permisos={["MARCA_LEER"]}>
                                                <li className="dpdwn-item"><Link className="nav-link text-reset small" to="/cargarmarca">Marcas</Link></li>
                                            </Can>
                                            <Can permisos={["MODELO_LEER"]}>
                                                <li className="dpdwn-item"><Link className="nav-link text-reset small" to="/cargarmodelo">Modelos</Link></li>
                                            </Can>
                                            <li className="dpdwn-item"><Link className="nav-link text-reset small" to="/verequipos">Ver Equipos</Link></li>
                                            <li className="dpdwn-item"><Link className="nav-link text-reset small" to="/verequiposbaja">Ver Equipos Dados De Baja</Link></li>
                                        </ul>
                                    </li>
                                    <Can permisos={["USUARIO_LEER"]}>
                                    <li className="nav-item dropdown item">
                                        <a className="nav-link dropdown-toggle text-reset" href="/#" id="navbarDropdownUsuarios" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Administracion de usuarios
                                        </a>
                                        <ul className="dropdown-menu color" aria-labelledby="navbarDropdownUsuarios">
                                            <li className="dpdwn-item"><Link className="nav-link text-reset" to="/usuarios">Usuarios</Link></li>
                                            <Can permisos={["PRIVILEGIO_LEER"]}>
                                                <li className="dpdwn-item"><Link className="nav-link text-reset" to="/privilegios">Privilegios</Link></li>
                                            </Can>
                                            <Can permisos={["ROL_LEER"]}>
                                                <li className="dpdwn-item"><Link className="nav-link text-reset" to="/roles">Roles</Link></li>
                                            </Can>
                                        </ul>
                                    </li>
                                    </Can>
                                </ul>
                            </div>
                            <div className="nav-item dropdown item">
                                <a className="nav-link dropdown-toggle text-reset fs-6" href="/#" id='navbarDropdownUser' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {_usuario}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end color" aria-labelledby="navbarDropdownUser">
                                    <li className="dpdwn-item">
                                        <a
                                            onClick={(e) => logout(e)}
                                            className="nav-link text-reset fs-6">
                                            Cerrar sesión
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Aquí se inyecta la ruta hija */}
            <div style={{ padding: 20 }}>
                <Outlet />
            </div>
        </div>
    );
}