import {Dado} from '../../pasos';

Dado(
	'un producto cuyo tipo de pedido tiene valida presupuesto = false, y {string} permite botelleo, y requiere motivo = {string}',
	(permiteBotelleo, requiereMotivo) => {
		cy.fixture('configuracion').then((configuracion) => {
			configuracion.configuraciones[0].tipoPedidos[0].validaPresupuesto = false;
			configuracion.configuraciones[0].tipoPedidos[0].habilitaSubunidades =
				permiteBotelleo === 'si' ? 'siempre' : 'nunca';
			configuracion.configuraciones[0].tipoPedidos[0].requiereMotivo =
				requiereMotivo === 'true';
			configuracion.configuraciones[0].tipoPedidos[0].catalogoMotivos = [
				{
					codigo: 1,
					descripcion: 'Producto en mal estado',
				},
				{
					codigo: 2,
					descripcion: 'Envase deteriorado',
				},
			];
			cy.intercept('GET', '/femsa/configuracion', configuracion).as(
				'configuracion'
			);
		});
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
			cy.intercept('GET', '/femsa/tomapedidos', db).as('datos');
		});
		cy.navegarPageInicio('2021-06-09');
		cy.wait('@configuracion');
		cy.wait('@datos');
		cy.oprimirBotonSplash();
		cy.ingresarCodigoCliente('HS002');
	}
);
