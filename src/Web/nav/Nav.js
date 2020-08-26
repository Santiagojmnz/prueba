import React from 'react';
import logo from './vicky.png';

export default function Nav() {

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-ligth shadow fixed-top ">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img
                        className="brand-image "
                        style={{ height: 45, width: 230 }}
                        src={logo}
                    />


                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home
            <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Productos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contacto</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Sobre nosotros</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )

}