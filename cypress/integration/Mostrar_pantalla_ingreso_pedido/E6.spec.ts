import {Dado} from '../../pasos';

Dado('que se ingreso con un cliente con _esCreditoBloqueado = true', () => {
	cy.fixture('db').then((db) => {
		db.clientes['HS002'].informacionCrediticia.esCreditoBloqueado = true;
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
});
