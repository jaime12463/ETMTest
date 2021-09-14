import {Dado, Y} from '../../pasos';

Dado(
	'que el prevendedor se encuentra en el ingreso de un _tipoPedido con _validaPresupuesto = true',
	() => {
		cy.fixture('db').then((db) => {
			db.clientes['HS002'].portafolio = [
				{
					codigoProducto: 234,
					esVentaSubunidades: true,
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

			db.presupuestoTipoPedido = [
				{
					tipoPedido: 1,
					presupuesto: 48,
					vigenciaInicioPresupuesto: '2020-09-01',
					vigenciaFinPresupuesto: '9999-09-06',
					tieneProductosHabilitados: true,
					productosHabilitados: [],
				},
			];

			cy.intercept('GET', '/femsa/tomapedidos', db).as('datos');
		});
		cy.navegarPageInicio('2021-06-09');
		cy.wait('@datos');
		cy.esperarConfiguracion();
		cy.oprimirBotonSplash();
		cy.ingresarCodigoCliente('HS002');
	}
);

Y(
	'tiene _tieneProductosHabilitados = true en el _presupuestoTipoPedido del _tipoPedido en curso',
	() => {}
);

Y(
	'el _codigoProducto no está informado en los _productosHabilitados',
	() => {}
);
