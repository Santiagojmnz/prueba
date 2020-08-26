import React, { useState } from 'react';
import $ from 'jquery';
import { rutaAPI } from '../../../config/Config';
import Swal from 'sweetalert2';

export default function EditAndDeleteProduct() {

    //Captura de datos

    const [product, updateProduct] = useState({

        name: "",
        price: "",
        sku: "",
        description: "",
        stock: "",
        image: "",
        _id:""

    })

    //onChange
    const cambiaFormPost = e => {

        updateProduct({

            ...product,
            [e.target.name]: e.target.value

        })

    }

    //Onsubmit

    const submitPost = async e => {

        $('.alert').remove();

        e.preventDefault();


        const { name, price, sku, description, stock, image  } = product;

        //Validacion de campos vacios
        if (name === "") {

            $(".invalid-name").show();
            $(".invalid-name").html("Completa este campo");

            return;

        }
        if (price === "") {

            $(".invalid-price").show();
            $(".invalid-price").html("Completa este campo");

            return;

        }
        if (sku === "") {

            $(".invalid-sku").show();
            $(".invalid-sku").html("Completa este campo");

            return;

        }

        //validacion de campo
        if (description === "") {

            $(".invalid-description").show();
            $(".invalid-description").html("Completa este campo");

            return;

        }
        if (stock === "") {

            $(".invalid-description").show();
            $(".invalid-description").html("Completa este campo");

            return;

        }







        //Solicitud post

        const result = await putData(product);

        if (result.status !== 200) {

            $(".modal-footer").before(`<div class="alert alert-danger">${result.message}</div>`)

        }

        if (result.status === 200) {

            $(".modal-footer").before(`<div class="alert alert-success">${result.message}</div>`)

            $('button[type="submit"]').remove();

            setTimeout(() => { window.location.href = "/productos"; }, 1000)
            return;

        }

    }

    //Retornar vista


    //Se capturan datos para editar
    $(document).on("click", ".editInputs", function (e) {
        console.log("data",data)

        e.preventDefault();

        var data = $(this).attr("data").split(',');
        console.log(data);

        $("#editName").val(data[0]);
        $("#editSurname").val(data[1]);
        $("#editEmail").val(data[2]);

        updateProduct({


            'name': $("#editName").val(),
            'surname': $("#editSurname").val(),
            'email': $("#editEmail").val(),
            'password': $("#editPassword").val(),
            '_id': data[0],


        })
    })
    //Datos delete
    $(document).on("click", ".delete", function (e) {

        e.preventDefault();

        var data = $(this).attr("data").split(',')[0];
        //Confirmar accion

        Swal.fire({
            title: 'Eliminar producto',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.value) {

                //servicio Delete
                const ProductDelete = async () => {
                    const result = await deleteData(data);
                   

                    if (result.status===200) {

                        Swal.fire({
                            type:"success",
                            title: result.message,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"
                                
                        }).then(function(result){
    
                             if(result.value){
    
                                 window.location.href= "/Productos";
    
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
    
                                 window.location.href= "/Productos";
    
                             }
    
                        })

                          }



                }
                ProductDelete();

            }

        })


    })

    return (

        <div className="modal fade " id="createProduct" >
            <div className="modal-dialog">
                <div className="modal-content container with">

                    <div className="modal-header mb-0">
                        <h4 className="modal-title">Nuevo Producto</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>


                    <form encType="multipart/form-data" onChange={cambiaFormPost} onSubmit={submitPost}>

                        <div className="modal-body row">

                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="Nombre">Nombre</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="Nombre"
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-name"></div>

                                </div>

                            </div>

                            <div className="form-group col-md-6 mb-0">

                                <label className="small text-secondary" htmlFor="Apellidos">Precio</label>

                                <div className="input-group  mb-3">

                                    <input
                                        id="precio"
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        placeholder="Precio*"
                                        required

                                    />
                                    <div className="invalid-feedback invalid-price"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-6 mb-0">

                                <label className="small text-secondary" htmlFor="Nombre">Sku</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="Nombre"
                                        name="sku"
                                        type="number"
                                        className="form-control"
                                        placeholder="Sku*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-name"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="Nombre">Descripcion</label>

                                <div className=" mb-3">


                                    <textarea
                                        id="Descripcion"
                                        name="description"
                                        type="text"
                                        className="form-control"
                                        placeholder="Descripcion*"
                                        rows="3"
                                        required

                                    />


                                    <div className="invalid-feedback invalid-name"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0 ">

                                <label className="small text-secondary" htmlFor="Cantidad">Cantidad</label>

                                <div className="input mb-3">

                                    <input
                                        id="Cantidad"
                                        name="stock"
                                        type="number"
                                        className="form-control"
                                        placeholder="Cantidad*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-name"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="image">Imagen</label>

                                <div className="input mb-3">

                                  

                                    <div className="invalid-feedback invalid-image"></div>
                                    <img className="img-fluid" />

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
    console.log("data",data)

    const url = `${rutaAPI}/delete-product/${data}`;
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