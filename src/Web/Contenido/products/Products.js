import React, { Fragment, useEffect, useState } from 'react';
import $ from 'jquery';
import { rutaAPI } from '../../../config/Config';
import './producs.css';


export default function Products() {
    
    
    const [products, setProducts] = useState(null)

    useEffect(() => {
     
        
        getData()
   
    }, [])
    
    const getData = () => {
	const url = `${rutaAPI}/products`;
	const params = {
		method: "GET",
	



	}
	return fetch(url, params).then(response => {
       
        
        return response.json();
        

	}).then(result => {
        console.log(result);
        return result;
        

	}).catch(error => {
        console.log(error);
        return error;
        

	})
}




    return (
        <Fragment>
            <h1 className="title">Productos</h1>
            <div className="container">
    

                <div className="row">
                

                    <div className="card">
                        <img src="img/img1.jpg" />
                        <h4></h4>
                        <p>Descripcion</p>
                        <p>precio</p>
                        <p>precio</p>
                        <p>disponible</p>


                    </div>

                    


                </div>


            </div>



        </Fragment>

    )


}





