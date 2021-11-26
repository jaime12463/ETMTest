import {Cuando, Entonces, Dado, Y} from '../../pasos';

Dado('que se ingresó un cliente que no tiene coberturas asignadas', () => {
	cy.navegarPageInicio('2021-06-11');
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS002');
});


Y('no mostrará el control para desplegar la tarjeta', () => {
	cy.get('[data-cy=tarjeta-Coberturas]').should('exist');
});

Y('mostrará el aviso "No existen coberturas para mostrar" en rojo', () => {
	cy.get('[data-cy=mensaje-Coberturas] > .MuiTypography-root').contains("No existen coberturas para mostrar");
	//cy.get('[data-cy=mensaje-Iniciativas] > .MuiTypography-root').contains("Este cliente no cuenta con iniciativas");
});