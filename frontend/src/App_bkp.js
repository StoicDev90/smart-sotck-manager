import React, { Component } from "react";
import { Link } from 'react-router-dom';

import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <div className="">
          <div className=" container-fluid nav-color">
            <nav className="navbar navbar-expand-lg nav-color">
              <div className="container-fluid">
                <div className="col-lg-2 col-sm-4 me-5 ">
                  <Link to="/" className="logo"><img className="logo" src={require('./assets/imagenes/logo.svg').default} alt="Smart Stock Manager" /> </Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon bi-list"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <ul className="navbar-nav">
                    <li className="item">
                      <Link className="nav-link text-reset" to="/">Home</Link>
                    </li>

                    <li className="nav-item dropdown item">
                      <a className="nav-link dropdown-toggle text-reset" href="/#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Equipos
                      </a>
                      <ul className="dropdown-menu color" aria-labelledby="navbarDropdownMenuLink">
                        <li className="dpdwn-item"><Link className="nav-link text-reset" to="/cargarmarca">Marcas</Link></li>
                        <li className="dpdwn-item"><Link className="nav-link text-reset" to="/cargarmodelo">Modelos</Link></li>
                        <li className="dpdwn-item"><Link className="nav-link text-reset" to="/cargarequipo">Cargar equipo</Link></li>
                        <li className="dpdwn-item"><Link className="nav-link text-reset" to="/verequipos">Ver Equipos</Link></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default App;