import {Dado, Y} from '../../pasos';

Dado('que se ingresó un cliente que tiene coberturas asignadas', () => {
	cy.navegarPageInicio('2021-06-11');
	cy.esperarDatos();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS003');
});

Y('el control para desplegar la tarjeta.', () => {
	cy.get('[data-cy=expandir-Coberturas]').should('be.visible');
});