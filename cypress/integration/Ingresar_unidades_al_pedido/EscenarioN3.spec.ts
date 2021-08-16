import {Cuando, Entonces, Y} from '../../pasos';

Cuando('se ingresa una cantidad y las subunidades no están habilitadas', () => {
	cy.ingresarCodigoProducto(1885);
	cy.ingresarUnidades(6);
});

Y('las subunidades no están habilitadas', () => {
	cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.disabled');
});

Entonces(
	'el sistema registrará las unidades y mostrará el producto actualizado en la lista y actualizará los totales e indicadores y permanecerá en la pantalla para el ingreso de un nuevo producto.',
	() => {
		//Aca se debe comprobar los indicadores y el total
	}
);
