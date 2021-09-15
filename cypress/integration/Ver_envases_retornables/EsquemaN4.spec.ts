import {Cuando, Entonces, Dado, Y} from '../../pasos';

Dado('que se realizó la venta {int} de un producto Promo Push {int}', (cantidadUnidades, codigoPromo) => {
	cy.navegarPageInicio('2021-06-09');
	cy.esperarDatosServidor();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS001');
    cy.agregarProducto({
		codigoProducto: codigoPromo,
		unidades: cantidadUnidades,
	});
});

Entonces('el sistema mostrará lo siguiente', () => {
    cy.get('[data-cy=listado-envases-retornables-0]').should('exist');
    cy.get('[data-cy=listado-envases-retornables-1]').should('exist');
});