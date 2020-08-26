import React, { useState } from 'react';
import { rutaAPI } from '../../config/Config'
import $ from "jquery";



export default function Login() {
    //HOKS paara iniciar sesion

    const [admins, iniciarSesion] = useState({
        email: "",
        password: ""

    });

    //Capturamos cambios del formulario

    const cambiaForm = e => {

        iniciarSesion({

            ...admins,
            [e.target.name]: e.target.value

        })

    }

    //Envio de informacion
    const login = async e => {
        $(".alert").remove();
        e.preventDefault();
        const result = await loginAPI(admins);

        

        if (result.status != 200) {
            $("button[type='submit']").before(`<div class="alert alert-danger">${result.message}</div>`)

        } else {
            localStorage.setItem("TOKEN", result.token);
            localStorage.setItem("ID", result.user._id);
            localStorage.setItem("USER", result.user.role);
            localStorage.setItem("NAME", result.user.name);
            window.location.href = "/";
        }
    }




    return (

        <div className="login-page" style={
            { minHeight: "512.391px" }} >

            <div className="login-box" >

                <div className="login-logo" >

                    <b> Vicky </b>

                </div>

                <div className="card" >

                    <div className="card-body login-card-body" >

                        <p className="login-box-msg">iniciar sesión</p>

                        <form onChange={cambiaForm}
                            onSubmit={login} >

                            <div className="input-group mb-3" >

                                <input type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email" />

                                <div className="input-group-append" >
                                    <div className="input-group-text" >
                                        <span className="fas fa-user" > </span>
                                    </div>
                                </div>

                            </div>

                            <div className="input-group mb-3" >

                                <input type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name="password" />

                                <div className="input-group-append" >
                                    <div className="input-group-text" >
                                        <span className="fas fa-lock" > </span>
                                    </div>
                                </div>

                            </div>

                            <button type="submit"
                                className="btn btn-primary btn-block">Ingresar </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )

}

// Peticion post login
const loginAPI = data => {
    const url = `${rutaAPI}/login`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params).then(response => {

        return response.json();
    }).then(result => {
        return result;
    }


    ).catch(error => {

        return error;
    })

}