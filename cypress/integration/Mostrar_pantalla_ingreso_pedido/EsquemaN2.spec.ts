import {Dado, Y} from '../../pasos';

Dado(
	'que el cliente tiene condición de pago crédito formal y {string}',
	(esCreditoBloqueado) => {
		cy.fixture('db').then((db) => {
			db.clientes['HS002'].informacionCrediticia.esCreditoBloqueado =
				esCreditoBloqueado === 'Si';
			cy.intercept('GET', '/femsa/tomapedidos', db).as('data');
		});
		cy.navegarPageInicio('2021-06-09');
		cy.wait('@data');
		cy.oprimirBotonSplash();
		cy.ingresarCodigoCliente('HS002');
	}
);

Y('el switch en estado On Disabled', () => {
	cy.get('#switch-cambiar-tipoPago-').should('be.checked');
	cy.get('#switch-cambiar-tipoPago-').should('be.disabled');
});
