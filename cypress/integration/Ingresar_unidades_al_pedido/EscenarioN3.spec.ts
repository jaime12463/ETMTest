import {Cuando, Entonces, Y} from '../../pasos';

Cuando('se ingresa un producto', () => {
	cy.agregarProducto({
		codigoProducto: 1885,
		unidades: 2,
		subUnidades:2
	});
});

Cuando('se ingresa una cantidad y las subunidades no están habilitadas', () => {
	cy.ingresarCodigoProducto(1885);
	cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.disabled');
	cy.ingresarUnidades(6);
});

Y('las subunidades no están habilitadas', () => {});

Entonces(
	'el sistema registrará las unidades y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.',
	() => {
		cy.get('[data-cy=producto-pedido-unidades-1885]').contains('6');
		cy.get('[data-cy=producto-pedido-subunidades-1885]').contains('0');
		//Aca se debe comprobar los indicadores y el total, y el item
	}
);
