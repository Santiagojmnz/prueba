import React from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import { rutaAPI } from '../../../config/Config'
import CreateProduct from './CreateProduct';
import EditAndDeleteProduct from './EditAndDeleteProduct';

export default function Products() {
	const productsData = async () => {
		//creamos el dataset
		const getProducts = await getData();
	

		const dataSet = [];
		getProducts.products.forEach((product, index) => {
			dataSet[index] = [(index + 1), product.image, product.name, product.price, product.sku, product.description, product.stock, product._id]

		})
		//SE ejecuta dataTable




		$(document).ready(function () {
			$('.table').DataTable({
				data: dataSet,
				columns: [
					{ title: "#" },
					{
						title: "Producto",
						render: function(data){

							return `<img src="${rutaAPI}/get-image/${data}" style="width:120px">`
					
						}
					},
					{ title: "Nombre" },
					{ title: "Precio" },
					{ title: "Sku" },
					{ title: "Descripción" },
					{ title: "Cantidad" },
					{
						title: "Editar/Eliminar",
						render: function (data) {

							return `
					  
							<a href="" class="editInputs" data-toggle="modal" data-target="#editProduct" data='${data}'>

							<button type="button" class="btn btn-primary btn-sm">Editar</button>
	  
							</a>
	  
							<a href="" class="delete" data='${data}'>
								
							<button type="button" class="btn btn-danger btn-sm">Eliminar</button>
							</a>`

						}
					}
				],



				"language": {

					"sProcessing": "Procesando...",
					"sLengthMenu": "Mostrar _MENU_ registros",
					"sZeroRecords": "No se encontraron resultados",
					"sEmptyTable": "Ningún dato disponible en esta tabla",
					"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
					"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
					"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
					"sInfoPostFix": "",
					"sSearch": "Buscar:",
					"sUrl": "",
					"sInfoThousands": ",",
					"sLoadingRecords": "Cargando...",
					"oPaginate": {
						"sFirst": "Primero",
						"sLast": "Último",
						"sNext": "Siguiente",
						"sPrevious": "Anterior"
					},
					"oAria": {
						"sSortAscending": ": Activar para ordenar la columna de manera ascendente",
						"sSortDescending": ": Activar para ordenar la columna de manera descendente"
					}

				}
			});
		})


	}
	productsData();

	//SE RETORNA VISTA DEL COMPONENTE
	return (

		<div className="content-wrapper" style={{ minHeight: "494px" }}>

			<div className="content-header">

				<div className="container-fluid">

					<div className="row mb-2">

						<div className="col-sm-6">

							<h1 className="m-0 text-dark">Productos</h1>

						</div>

					</div>

				</div>

			</div>

			<div className="content">

				<div className="container-fluid">

					<div className="row">

						<div className="col-lg-12">

							<div className="card card-primary card-outline">

								<div className="card-header">

									<h5 className="m-0">

										<button className="btn btn-primary" data-toggle="modal" data-target="#createProduct">Nevo Producto</button>

									</h5>

								</div>

								<div className="card-body">

									<table className="table table-striped dt-responsive" style={{ "width": "100%" }}>




									</table>

								</div>

							</div>

						</div>

					</div>

				</div>

			</div>


<CreateProduct/>
<EditAndDeleteProduct/>

		</div>

	)

}

// getProducts
const getData = () => {
	const url = `${rutaAPI}/products`;
	const params = {
		method: "GET",
		headers: { "Authorization": localStorage.getItem("TOKEN") }



	}
	return fetch(url, params).then(response => {
		return response.json();

	}).then(result => {
		return result;

	}).catch(error => {
		return error;

	})
}

