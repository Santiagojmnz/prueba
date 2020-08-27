import React, { useState } from 'react';
import $ from 'jquery';
import { rutaAPI } from '../../../config/Config';
import Swal from 'sweetalert2';
import notie from 'notie';

export default function EditAndDeleteProduct() {
    //Hook para capturar datos
    const [product, editProduct] = useState({

        name: "",
        price: "",
        sku: "",
        description: "",
        stock: "",
        image: "",
        id: ""

    });

    //Onchange
    const cambiaFormPut = e => {
        let image = $("#editImage").get(0).files[0];
        if ($("#editImage").val()) {
            editProduct({
                'name': $("#editName").val(),
                'price': $("#editPrice").val(),
                'sku': $("#editSku").val(),
                'description': $("#editDescription").val(),
                'stock': $("#editStock").val(),
                'image': image,
                'id': $("#idProduct").val()

            })

        } if (!$("#editImage").val()) {
            editProduct({
                'name': $("#editName").val(),
                'price': $("#editPrice").val(),
                'sku': $("#editSku").val(),
                'description': $("#editDescription").val(),
                'stock': $("#editStock").val(),
                'image': null,
                'id': $("#idProduct").val()

            })

        }
    }


    //Onsubmit 
    const submitPut = async e => {
        $('.alert').remove();

        e.preventDefault();



        const { name, price, sku, description, stock } = product;
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
        const result = await putData(product);

        if (result.status != 200) {

            $(".modal-footer").before(`<div class="alert alert-danger">${result.message}</div>`)

            setTimeout(() => { window.location.href = "/productos"; }, 3000)


        }
        if (result.status === 200) {
            $(".modal-footer").before(`<div class="alert alert-success">${result.message}</div>`)


            $('button[type="submit"]').remove();

            setTimeout(() => { window.location.href = "/productos"; }, 1000)


        }







    }
    //Capturamos datos apra editar
    $(document).on("click", ".editInputs", function (e) {
        e.preventDefault();

        const data = $(this).attr("data").split(',');
        $("#idProduct").val(data[6]);
        $("#editName").val(data[1]);
        $("#editPrice").val(data[2]);
        $("#editSku").val(data[3]);
        $("#editDescription").val(data[4]);
        $("#editStock").val(data[5]);




    })
    //DAtos para eliminar producto
    $(document).on("click", ".delete", function (e) {

        e.preventDefault();
        const data = $(this).attr("data").split(',');
        console.log("DATA1", data);

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


                    if (result.status === 200) {

                        Swal.fire({
                            type: "success",
                            title: result.message,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"

                        }).then(function (result) {

                            if (result.value) {

                                window.location.href = "/productos";

                            }

                        })

                    }
                    if (result.status !== 200) {
                        Swal.fire({
                            type: "error",
                            title: result.message,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"

                        }).then(function (result) {

                            if (result.value) {

                                window.location.href = "/productos";

                            }

                        })

                    }



                }
                ProductDelete();

            }

        })


    })






    //Vista de formulario
    return (

        <div className="modal  " id="editProduct" >
            <div className="modal-dialog">
                <div className="modal-content ">

                    <div className="modal-header mb-0">
                        <h4 className="modal-title">Editar Producto</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>


                    <form onChange={cambiaFormPut} onSubmit={submitPut} encType="multipart/form-data"  >

                        <div className="modal-body row">
                            <input type="hidden" id="idProduct" />

                            <div className="form-group col-md-12 mb-0">

                                <label className="small text-secondary" htmlFor="editName">Nombre</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="editName"
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

                                <label className="small text-secondary" htmlFor="editPrice">Precio</label>

                                <div className="input-group  mb-3">

                                    <input
                                        id="editPrice"
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

                                <label className="small text-secondary" htmlFor="editSku">Sku</label>

                                <div className="input-group mb-3">

                                    <input
                                        id="editSku"
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

                                <label className="small text-secondary" htmlFor="editDescription">Descripcion</label>

                                <div className=" mb-3">


                                    <textarea
                                        id="editDescription"
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

                                <label className="small text-secondary" htmlFor="editStock">Cantidad</label>

                                <div className="input mb-3">

                                    <input
                                        id="editStock"
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

                                <label className="small text-secondary" htmlFor="editImage">Imagen</label>

                                <div className="input mb-3">

                                    <input
                                        type="file"
                                        name="editImage"
                                        id="editImage"
                                        className="form-control-file border"


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

//Peticion Delete
const deleteData = data =>{

	const url = `${rutaAPI}/delete-product/${data}`;
	const token = localStorage.getItem("TOKEN");
	const params = {

		method: "DELETE",
		headers: {

			"Authorization": token,
			"Content-Type": "application/json"
		}

	}

	return fetch(url, params).then(response=>{

		return response.json();

	}).then(result=>{

		return result;

	}).catch(err=>{

		return err;

	})

}


//servicio put
const putData = data => {
    const url = `${rutaAPI}/update-product/${data.id}`;
    const token = localStorage.getItem("TOKEN");
    let formData = new FormData();

    formData.append("sku", data.sku);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("image", data.image);
    const params = {
        method: "PUT",
        body: formData,
        headers: {
            "Authorization": token
        }
    }
    return fetch(url, params).then(response => {
        console.log("response", response);
        return response.json();
    }).then(result => {
        console.log("result", result);
        return result;
    }).catch(err => {
        return err.error;
    })
}


