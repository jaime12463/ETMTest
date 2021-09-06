import {Cuando, Dado, Y} from '../../pasos';

//Escenarios compartidos
Cuando(
	'se encuentra habilitado el ingreso del producto',
	() => {
		cy.get('[data-cy=codigo-producto-a-buscar]').should('be.enabled');
	}
);