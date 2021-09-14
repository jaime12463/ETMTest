import {Entonces, Cuando} from '../../pasos';

Cuando('ingresa un producto que no tiene precio vigente', () => {
	cy.get('[data-cy=codigo-producto-a-buscar]').type('123{ENTER}');
});

Entonces(
	'el sistema mostrará mensaje “El código no corresponde a un producto del portafolio del cliente”',
	() => {
		cy.get('[data-cy=producto-no-esta-en-portafolio]').should('exist');
	}
);
