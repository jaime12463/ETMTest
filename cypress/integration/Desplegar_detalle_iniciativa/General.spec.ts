import {Dado, Cuando, Entonces, Y} from '../../pasos';

//E1 E2 E3
Dado('que estoy en la tarjeta de iniciativas', () => {
	cy.navegarPageInicio('2021-06-11');
	cy.esperarDatos();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS003');

	cy.get('[data-cy=expandir-Iniciativas]').click();
});

Cuando('se despliega la iniciativa', () => {
	cy.get('[data-cy=ver-detalle-iniciativa-1]').click();
});

Entonces('el sistema mostrará el detalle de la iniciativa', () => {
	cy.get('[data-cy=iniciativa-detalle-1]').should('be.visible');
	
});

Y('mostrará el _nombreIniciativa', () => {
    cy.get('[data-cy=iniciativa-titulo-1]').should('be.visible');
});

Y('_idMaterialIniciativa, _nombre, _presentación de la unidades, precio por unidad, precio por subunidad', () => {
    cy.get('[data-cy=iniciativa-material-1]').should('exist');
    cy.get('[data-cy=iniciativa-nombreProducto-1]').should('exist');
    cy.get('[data-cy=iniciativa-presentacion-1]').should('exist');
    cy.get('[data-cy=iniciativa-precioUnidad-1]').should('exist');
    cy.get('[data-cy=iniciativa-precioSubunidad-1]').should('exist');

});


Y('{string} se ingreso a la toma de pedido {string} habilita la selección del status', (ingresoTomaDePedido, habilitaSeleccion) => {
	if(ingresoTomaDePedido === 'si')
	{
		cy.get('[data-cy=boton-inferior-avanzar]').click();
		cy.get('[data-cy=boton-atras]').click();
	}

	//Continuar
	/*if(habilitaSeleccion === 'no habilita')
	{
		cy.get('[data-cy=expandir-Iniciativas]').click();

		cy.get('[data-cy=iniciativa-estatus-value-1]').

	}*/
});