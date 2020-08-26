import React from 'react';
import logo from '../images/vicky.png';

const Navbar = () => (
    <nav   className="navbar navbar-expand-lg navbar-dark bg-light  static-top">
        <div className="container">
            <a className="navbar-brand" href="#">
            <img src={logo}  width="160" height="40"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link text-dark" href="#">Inicio
                <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="#">Productos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="#">Contact</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link text-dark" href="#">Sobre Nosotros</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>


);

export default Navbar;