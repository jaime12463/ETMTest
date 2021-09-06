import {Dado, Y} from '../../pasos';

Dado(
	'tipo de pedido _esValorizado = true y cliente con _esCreditoBloqueado = false',
	() => {
		cy.fixture('db').then((db) => {
			db.clientes['HS002'].informacionCrediticia.esCreditoBloqueado = false;
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

Y('{string} es crédito Disponible mayor a cero', (estadoCredito) => {
	if (estadoCredito == 'No') {
		cy.agregarProducto({
			unidades: 102,
			subUnidades: 1,
			codigoProducto: 340,
		});
	}
});
