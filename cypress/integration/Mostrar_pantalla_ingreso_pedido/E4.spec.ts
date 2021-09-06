import {Dado, Y, Cuando} from '../../pasos';

Dado(
	'el tipo de pedido seleccionado es de un tipo de pedido _esValorizado = true y {string}',
	(esCreditoBloqueado) => {
		cy.fixture('db').then((db) => {
			db.clientes['HS002'].informacionCrediticia.esCreditoBloqueado =
				esCreditoBloqueado === 'Si';
			cy.intercept('GET', '/femsa/tomapedidos', db).as('datos');
		});
		cy.fixture('configuracion').then((configuracion) => {
			configuracion.configuraciones[0].tipoPedidos[0].esValorizado = true;
			cy.intercept('GET', '/femsa/configuracion', configuracion).as(
				'configuracion'
			);
		});
		cy.navegarPageInicio('2021-06-09');
		cy.wait('@datos');
		cy.wait('@configuracion');
		cy.oprimirBotonSplash();
	}
);

Cuando(
	'ingreso a registrar un pedido con un cliente en condición de pago crédito formal',
	() => {
		cy.ingresarCodigoCliente('HS002');
	}
);

Y('el switch en estado On Disabled', () => {
	cy.get('#switch-cambiar-tipoPago-').should('be.checked');
	cy.get('#switch-cambiar-tipoPago-').should('be.disabled');
});
