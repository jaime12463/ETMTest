import {Dado, Entonces, Y} from '../../pasos';

Dado(
	'que el cliente tiene condición de pago crédito formal y {string}',
	(esCreditoBloqueado) => {
		cy.fixture('db').then((db) => {
			db.clientes['HS001'].informacionCrediticia.esCreditoBloqueado =
				esCreditoBloqueado === 'Si';
			cy.intercept('GET', '/femsa/tomapedidos', db).as('data');
		});
		cy.navegarPageInicio('2021-06-09');
		cy.wait('@data');
		cy.oprimirBotonSplash();
		cy.ingresarCodigoCliente('HS001');
	}
);

Entonces('el sistema {string}', () => {});

Y('el switch en estado On Disabled', () => {
	//verificar si deshabilita y prendido el switch
});
