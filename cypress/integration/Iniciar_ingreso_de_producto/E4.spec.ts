import {Entonces, Cuando, Dado} from '../../pasos';

Dado(
	'un producto del portafolio con es _esVentaSubunidades = {string} y el tipo de pedido con _habilitaSubunidades = {string}',
	(esVentaSubunidades, habilitaSubunidades) => {
		cy.fixture('configuracion').then((configuracion) => {
			configuracion.configuraciones[0].tipoPedidos[0].habilitaSubunidades = habilitaSubunidades;
			cy.intercept('GET', '/femsa/configuracion', configuracion).as(
				'configuracion'
			);
		});
		cy.fixture('db').then((db) => {
			db.clientes['HS002'].portafolio = [
				{
					codigoProducto: 234,
					esVentaSubunidades: esVentaSubunidades === 'true',
					precios: [
						{
							precioConImpuestoUnidad: 106,
							precioConImpuestoSubunidad: 8.84,
							vigenciaInicioPrecio: '2020-09-07',
							vigenciaFinPrecio: '9999-09-31',
						},
					],
				},
			];

			db.productos[234] = {
				codigoProducto: 234,
				nombre: 'TEST PRODUCTO VIGENTE',
				presentación: 1,
				subunidadesVentaMinima: 1,
				tipoProducto: 1,
			};
			cy.intercept('GET', '/femsa/tomapedidos', db).as('datos');
		});
		cy.navegarPageInicio('2021-06-09');
		cy.wait('@configuracion');
		cy.wait('@datos');
		cy.oprimirBotonSplash();
		cy.ingresarCodigoCliente('HS002');
	}
);

Cuando('ingreso el producto', () => {
	cy.get('[data-cy=codigo-producto-a-buscar]').type('234{ENTER}');
});

Entonces(
	'el sistema mostrara {string} las subunidades en el ingreso del pedido',
	(mostrarHabilitadasSubunidades) => {
		if (mostrarHabilitadasSubunidades == 'HABILITA') {
			cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.enabled');
		} else {
			cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.disabled');
		}
	}
);
