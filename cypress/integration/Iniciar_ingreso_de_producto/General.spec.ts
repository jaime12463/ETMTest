import {Dado, Entonces, Y, Cuando} from '../../pasos';

//E1, E2
Dado('que el prevendedor se encuentra en el ingreso de un _tipoPedido', () => {
	cy.fixture('db').then((db) => {
		db.clientes['HS002'].portafolio = [];
		db.clientes['HS002'].portafolio.push({
			codigoProducto: 123,
			esVentaSubunidades: true,
			precios: [
				{
					precioConImpuestoUnidad: 106,
					precioConImpuestoSubunidad: 8.84,
					vigenciaInicioPrecio: '2022-09-07',
					vigenciaFinPrecio: '2017-09-31',
				},
			],
		});

		db.productos[123] = {
			codigoProducto: 123,
			nombre: 'TEST PRODUCTO NO VIGENTE',
			presentación: 1,
			subunidadesVentaMinima: 1,
			tipoProducto: 1,
		};

		db.clientes['HS002'].portafolio.push({
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
		});

		db.productos[234] = {
			codigoProducto: 234,
			nombre: 'TEST PRODUCTO VIGENTE',
			presentación: 1,
			subunidadesVentaMinima: 1,
			tipoProducto: 6,
		};

		cy.intercept('GET', '/femsa/tomapedidos', db).as('datos');
	});
	cy.fixture('configuracion').then((configuracion) => {
		configuracion.configuraciones[0].tipoPedidos[0].tipoProductosHabilitados = [
			1,
			9,
		];
		cy.intercept('GET', '/femsa/configuracion', configuracion).as(
			'configuracion'
		);
	});
	cy.navegarPageInicio('2021-06-09');
	cy.wait('@configuracion');
	cy.wait('@datos');
	cy.esperarConfiguracion();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS002');
});

//E1, E2, E3

Y('el ingreso de productos se encuentra habilitado', () => {
	cy.get('[data-cy=codigo-producto-a-buscar]').should('be.enabled');
});

// E2, E3
Cuando('ingresa un producto que tiene precio vigente', () => {
	cy.get('[data-cy=codigo-producto-a-buscar]').type('234{ENTER}');
});

Entonces(
	'el sistema mostrará el mensaje "El producto no está habilitado para " + _descripcion del _tipoPedidos',
	() => {
		cy.get('[data-cy=producto-no-esta-habilitado]').should('exist');
	}
);

//E5, E6, E7

Y('tiene precio informado para la fecha de entrega calculada', () => {});

Cuando(
	'ingresa un producto del portafolio del cliente que no se encuentra en el pedido',
	() => {
		cy.get('[data-cy=codigo-producto-a-buscar]').type('234{ENTER}');
	}
);

//E5, E6
Y(
	'el _tipoProducto es un _tipoProductosHabilitado para el _tipoPedido en curso',
	() => {}
);

//E5, E6, E7, E8
Entonces('el sistema mostrará la descripción del producto', () => {
	cy.get('[data-cy=info-producto]').should('exist');
});

Y('el precio unidad {string} se mostrará', (mostarPrecioUnidad) => {
	if (mostarPrecioUnidad === 'si') {
		cy.get('[data-cy=info-unidades]').should('exist');
	} else {
		cy.get('[data-cy=info-unidades]').should('not.exist');
	}
});

Y('el precio subunidad {string} se mostrará', (mostarPrecioSubunidad) => {
	if (mostarPrecioSubunidad === 'si') {
		cy.get('[data-cy=info-subunidades]').should('exist');
	} else {
		cy.get('[data-cy=info-subunidades]').should('not.exist');
	}
});

Y('habilitará el ingreso de unidades inicializadas en cero', () => {});

Y(
	'{string} habilita el ingreso de subunidades es inicializadas en cero',
	(habilitaIngresoSubunidades) => {
		if (habilitaIngresoSubunidades === 'si') {
			cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.enabled');
		} else {
			cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.disabled');
		}
	}
);

Y(
	'{string} habilita el ingreso del motivo cargado con las _descripcion del _catalogoMotivos para el tipo de pedido en curso, ordenado por código ascendente y sin motivo seleccionado.',
	(habilitaIngresoMotivo) => {
		if (habilitaIngresoMotivo === 'si') {
			cy.get('#select-cambiar-catalogo-motivo').should('exist');
		} else {
			cy.get('#select-cambiar-catalogo-motivo').should('not.exist');
		}
	}
);
