import {Dado, Entonces} from '../../pasos';

Dado('que el tipo de pedido _esValorizado = true', () => {
	cy.fixture('configuracion').then((configuracion) => {
		configuracion.configuraciones[0].tipoPedidos[0].esValorizado = true;
		cy.intercept('GET', '/femsa/configuracion', configuracion).as(
			'configuracion'
		);
	});
	cy.navegarPageInicio('2021-06-09');
	cy.wait('@configuracion');
	cy.esperarDatos();
	cy.oprimirBotonSplash();
});

Entonces(
	'el sistema mostrará el panel de ingreso del producto, el switch crédito, los totales',
	() => {
		//TODO: Cuales totales son
		cy.get('[data-cy=codigo-producto-a-buscar]').should('be.enabled');

		cy.get('[data-cy=total-credito]').should('exist');
		cy.get('[data-cy=total-contado]').should('exist');

		cy.get('#switch-cambiar-tipoPago-').should('exist');
	}
);
