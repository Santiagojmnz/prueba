import React from 'react';

export default function Footer({fecha}){

	return(
		
		<div className="jumbotron text-center" style={{"marginBottom":0}}>
		  <p>{fecha}</p>
		</div>

	)
}