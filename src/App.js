import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
//Componente login
//Componenentes Fisicos

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';

//Componentes dinamicos
import Admins from './components/contents/admins/Admins';
import Users from './components/contents/users/Users'
import Products from './components/contents/products/Products'
import Error404 from './components/contents/error404/Error404'
import Login from './components/login/Login';
import Web from './Web';


function App() {
 
  const auth = getAccessToken();
  if (!auth) {
    return (
     
      <Login />
    )

  }
  return (
    <div className="sidebar-mini">

      <div className="wrapper">


        <Header />
        <Sidebar />

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Admins} />
            <Route exact path="/usuarios" component={Users} />
            <Route exact path="/productos" component={Products} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>

        <Footer />


      </div>

    </div>
  );
}


const getAccessToken = () => {

  const accessToken = localStorage.getItem("TOKEN");
  const id = localStorage.getItem("ID");
  const user = localStorage.getItem("USER");
  

 

  if (!accessToken || accessToken == null || !id||id==null || !user || user==null) {
    return false;
  } else {
    const successful = jwtDecode(accessToken);
    if(!successful){
      return false;

    }

    if (tokenExpired(accessToken, successful) || successful.sub !== id || successful.role !== user) {
      
     
      return false;

    } else {
      return true;
    }
  }


}

//Expiracion de token
const tokenExpired = (accessToken, successful) => {

  const seconds = 60;

  const { exp } = successful;

  const now = (Date.now() + seconds) / 1000;

  return exp < now;
}


export default App;
