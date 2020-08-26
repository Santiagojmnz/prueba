import React, {Fragment}  from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Header from './Web/header/Header';
import Nav from './Web/nav/Nav';
import Sidebar from './Web/sidebar/Sidebar';
import Footer from './Web/footer/Footer';
import Products from './Web/Contenido/products/Products';



export default function Web() {

  

  const fecha = new Date().getFullYear();
  
  return (

    <Fragment>
  
      

      <Nav />

      


        {/* <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Products} />
           <Route component="" />
          </Switch>
        </BrowserRouter> */}
          

     <Products/>
      

      

    </Fragment>
  
    
  
  );

}


