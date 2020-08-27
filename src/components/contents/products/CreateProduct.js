import React, { useState } from 'react';
import $, { type } from 'jquery';
import { rutaAPI } from '../../../config/Config'
import notie from 'notie';




export default function CreateProduct() {

    //Hoks para capturar datos

    const [product, createProduct] = useState({

        name: "",
        price: "",
        sku: "",
        description: "",
        stock: "",
        image: ""

    });

    //ONchange
    
    const cambiaFormPut = e => {
        let image = $("#image").get(0).files[0];
          createProduct({


            'name': $("#name").val(),
            'price': $("#price").val(),
            'sku': $("#sku").val(),
            'description': $("#description").val(),
            'stock': $("#stock").val(),
            'image': image

        })
    }
    const submitPut = async e => {

        $('.alert').remove();

        e.preventDefault();

        const { name, price, sku, description, stock, image } = product;

        //Validar campos 
        if (name === "") {

            $(".invalid-url").show();
            $(".invalid-url").html("Completa este campo");

            return;

        }
        if (price === "") {

            $(".invalid-url").show();
            $(".invalid-url").html("Completa este campo");
            return;
        }
        if (sku === "") {

            $(".invalid-url").show();
            $(".invalid-url").html("Completa este campo");
            return;
        }



        if (description === "") {

            $(".invalid-url").show();
            $(".invalid-url").html("Completa este campo");
            return;
        }
        if (stock === "") {

            $(".invalid-url").show();
            $(".invalid-url").html("Completa este campo");
            return;
        }
        if (image === null) {

            $(".invalid-url").show();
            $(".invalid-url").html("Completa este campo");
            return;
        }
        const result = await postData(product);

        if (result.status !==200) {

            $(".modal-footer").before(`<div class="alert alert-danger">${result.message}</div>`)
          
            setTimeout(() => { window.location.href = "/productos"; }, 3000)
            

        }
        if (result.status === 200) {
            $(".modal-footer").before(`<div class="alert alert-success">${result.message}</div>`)
           

            $('button[type="submit"]').remove();
          
            setTimeout(() => { window.location.href = "/productos"; }, 1000)


        }

    }





    //Retornar vista

    return (

        <div className="modal  " id="createProduct" >
            <div className="modal-dialog">
                <div className="modal-content ">

                    <div className="modal-header mb-0">
                        <h4 className="modal-title">Nuevo Producto</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>


                    <form  onChange={cambiaFormPut} onSubmit={submitPut}  >

                        <div className="modal-body row">

                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="Nombre">Nombre</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="name"
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
                                        id="price"
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
                                        id="sku"
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
                                        id="description"
                                        name="description"
                                        type="text"
                                        className="form-control"
                                        placeholder="Descripcion*"
                                        rows="3"
                                        required

                                    />


                                    <div className="invalid-feedback invalid-description"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0 ">

                                <label className="small text-secondary" htmlFor="Cantidad">Cantidad</label>

                                <div className="input mb-3">

                                    <input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        className="form-control"
                                        placeholder="Cantidad*"
                                        required

                                    />

                                    <div className="invalid-feedback invalid-stock"></div>

                                </div>

                            </div>
                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="image">Imagen</label>

                                <div className="input mb-3">

                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        className="form-control-file border"
                                        required
                                    />

                                    <div className="invalid-feedback invalid-image"></div>


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

//servicio post
const postData = data => {
    const url = `${rutaAPI}/new-product`;
    const token = localStorage.getItem("TOKEN");
    let formData = new FormData();
    console.log("data img",data.image);
    formData.append("sku", data.sku);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("image", data.image);
    const params = {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": token
        }
    }
    return fetch(url, params).then(response => {
        console.log("response",response);
        return response.json();
    }).then(result => {
        console.log("result",result);
        return result;
    }).catch(err => {
        return err.error;
    })
}