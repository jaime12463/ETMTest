import {Cuando, Entonces, Y} from '../../pasos';

Cuando('se ingresa {int}', (unidades) => {
	cy.agregarProducto({
		codigoProducto: 1885,
		unidades,
		subUnidades:2
	});
});

Y('es mayor a la cantidad máxima de unidades', () => {});

Entonces(
	'el sistema mostrará el mensaje “La cantidad es mayor a 100 ¿Desea continuar?” SiNo',
	() => {
		cy.get('[data-cy=cantidad-es-mayor]').should('exist');
	}
);
