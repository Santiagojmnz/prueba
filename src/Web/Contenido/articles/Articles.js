import React, {Fragment}  from 'react';
import './articles.css';

export default function Articles({articulo}){

	const { id, titulo, descripcion } = articulo;

	return(

		<Fragment>
			<h2>{titulo}</h2>
	      	<h5>Title description, Dec 7, 2017</h5>
	      	<div className="fakeimg">Fake Image</div>
	      	<p>Some text..</p>
	      	<p>{descripcion}</p>
	      	<br />
      	</Fragment>

	)


}