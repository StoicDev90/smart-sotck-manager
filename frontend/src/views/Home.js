import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Home.css';

export default function Home() {
    return (
        <div className="container my-3">
            <div>
                <h1 className="text-center">Inventarios</h1>
            </div>
            <div className="row justify-content-around">
                <div className="col-4">
                    <Link className="nav-link text-reset" to="/verequipos">
                        <div className="tarjeta-link soporte"></div>
                        <h3 className="text-center">Soporte Técnico</h3>
                    </Link>
                </div>
                <div className="col-4">
                    <Link className="nav-link text-reset" to="/verequipos">
                        <div className="tarjeta-link seguridad"></div>
                        <h3 className="text-center">Seguridad Informática</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}