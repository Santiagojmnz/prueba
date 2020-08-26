
import React, {useEffect,useState,Fragment}from 'react';

import axiosUsers from '../../Config/axioUsers';
    const Users = () => {
    //Users es el estado - sitio de almcenamiento
    // SetUsers es la funcion para actualzizar clientes
    const [users,setUsers]=useState([]);
    const getUsers = async()=>{
          const response = await axiosUsers.get('/users');
          console.log(response.data);

          setUsers(response.data);
          
    };


    useEffect(()=>{
        getUsers();
      },[]);

 
    const renderUsers =()=>{
      return(
        <Fragment>
          
            {
              users.map((user, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            }
        
        </Fragment>
      );
    };

return(
  <Fragment>
  <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  {renderUsers()}
</table>
</Fragment>


);
};
export default Users;
/**/