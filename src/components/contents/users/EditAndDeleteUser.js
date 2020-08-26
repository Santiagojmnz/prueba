import React, { useState } from 'react';
import $ from 'jquery';
import { rutaAPI } from '../../../config/Config';
import Swal from 'sweetalert2';

export default function EditAndDeleteUser() {

    //Captura de datos

    const [user, updateUser] = useState({

        name: "",
        surname: "",
        email: "",
        password: "",
        _id: ""

    })

    //onChange
    const cambiaFormPost = e => {

        updateUser({

            ...user,
            [e.target.name]: e.target.value

        })

    }

    //Onsubmit

    const submitPost = async e => {

        $('.alert').remove();

        e.preventDefault();


        const { name, surname, email, password } = user;

        //Validacion de campos vacios

        if (name === "") {

            $(".invalid-name").show();
            $(".invalid-name").html("Completa este campo");

            return;

        }
        if (surname === "") {

            $(".invalid-surname").show();
            $(".invalid-surname").html("Completa este campo");

            return;

        }
        if (email === "") {

            $(".invalid-email").show();
            $(".invalid-email").html("Completa este campo");

            return;

        }

        //Se valdia que cumpla con el formato Expresion Regular
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {

            $(".invalid-email").show();
            $(".invalid-email").html("Ingresa un correo electronico valido");

            return;

        }
        if (password) {
            if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password)) {

                $(".invalid-password").show();
                $(".invalid-password").html("El formato no coincide");

                return;

            }

        }






        //Solicitud post

        const result = await putData(user);

        if (result.status !== 200) {

            $(".modal-footer").before(`<div class="alert alert-danger">${result.message}</div>`)

        }

        if (result.status === 200) {

            $(".modal-footer").before(`<div class="alert alert-success">${result.message}</div>`)

            $('button[type="submit"]').remove();

            setTimeout(() => { window.location.href = "/usuarios"; }, 1000)
            return;

        }

    }

    //Retornar vista


    //Se capturan datos para editar
    $(document).on("click", ".editInputs", function (e) {

        e.preventDefault();

        var data = $(this).attr("data").split(',');
        console.log(data);

        $("#editName").val(data[0]);
        $("#editSurname").val(data[1]);
        $("#editEmail").val(data[2]);

        updateUser({


            'name': $("#editName").val(),
            'surname': $("#editSurname").val(),
            'email': $("#editEmail").val(),
            'password': $("#editPassword").val(),
            '_id': data[3],


        })
    })
    //Datos delete
    $(document).on("click", ".delete", function (e) {

        e.preventDefault();

        var data = $(this).attr("data").split(',')[3];
        //Confirmar accion

        Swal.fire({
            title: 'Eliminar usuario',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.value) {

                //servicio Delete
                const UserDelete = async () => {
                    const result = await deleteData(data);
                   

                    if (result.status===200) {

                        Swal.fire({
                            type:"success",
                            title: result.message,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"
                                
                        }).then(function(result){
    
                             if(result.value){
    
                                 window.location.href= "/usuarios";
    
                             }
    
                        })
      
                    }
                    if (result.status !==200) {
                        Swal.fire({
                            type:"error",
                            title: result.message,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"
                                
                        }).then(function(result){
    
                             if(result.value){
    
                                 window.location.href= "/usuarios";
    
                             }
    
                        })

                          }



                }
                UserDelete();

            }

        })


    })

    return (

        <div className="modal" id="editUser">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Editar usuario</h4>

                    </div>


                    <form onChange={cambiaFormPost} onSubmit={submitPost} >

                        <div className="modal-body">

                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="editName">Nombre</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="editName"
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre*"


                                    />

                                    <div className="invalid-feedback invalid-name"></div>

                                </div>

                            </div>

                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="editSurname">Apellidos</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="editSurname"
                                        type="text"
                                        name="surname"
                                        className="form-control"
                                        placeholder="Apellidos*"


                                    />
                                    <div className="invalid-feedback invalid-surname"></div>

                                </div>

                            </div>
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="editEmail">Correo Electronico</label>

                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fa fa-envelope "></i>
                                    </div>

                                    <input
                                        id="editEmail"
                                        type="email"
                                        name="email"
                                        className="form-control text-tolowercase"
                                        placeholder="Correo electronico*"
                                        pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}"


                                    />
                                    <div className="invalid-feedback invalid-email"></div>

                                </div>

                            </div>



                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="password">* Mínimo 8 caracteres, letras en mayúscula, en minúscula y números</label>

                                <div className="input-group mb-3">

                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-key"></i>
                                    </div>

                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Contraseña*"
                                        pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}"



                                    />

                                    <div className="invalid-feedback invalid-password"></div>

                                </div>

                            </div>

                        </div>


                        <div className="modal-footer d-flex justify-content-between">

                            <div><button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button></div>

                            <div><button type="submit" className="btn btn-primary">Enviar</button></div>

                        </div>

                    </form>

                </div>
            </div>
        </div>

    )

}

//Peticion Update
const putData = data => {

    const url = `${rutaAPI}/update-user/${data._id}`;
    const token = localStorage.getItem("TOKEN");
    const params = {

        method: "PUT",
        body: JSON.stringify(data),
        headers: {

            "Authorization": token,
            "Content-Type": "application/json"
        }

    }

    return fetch(url, params).then(response => {


        return response.json();

    }).then(result => {

        return result;

    }).catch(err => {

        return err;

    })

}
//Peticion Delete
const deleteData = data => {

    const url = `${rutaAPI}/delete-user/${data}`;
    const token = localStorage.getItem("TOKEN");
    const params = {

        method: "DELETE",
        headers: {

            "Authorization": token,
            "Content-Type": "application/json"
        }

    }

    return fetch(url, params).then(response => {


        return response.json();

    }).then(result => {

        return result;

    }).catch(err => {

        return err;

    })

}