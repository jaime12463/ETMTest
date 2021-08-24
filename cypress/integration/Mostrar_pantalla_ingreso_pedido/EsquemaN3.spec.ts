import {Cuando, Dado, Entonces, Y} from '../../pasos';

Dado(
	'que el cliente tiene condición de pago crédito informal y esCreditoBloqueado = false',
	() => {
		cy.navegarPageInicio('2021-06-09');
		cy.esperarDatosServidor();
		cy.oprimirBotonSplash();
		cy.ingresarCodigoCliente('HS003');
	}
);

Cuando('{string} es crédito Disponible mayor a cero', (estadoCredito) => {
	if (estadoCredito === 'Si') {
		cy.agregarProducto({
			codigoProducto: 1885,
			unidades: 3,
			subUnidades: 4,
		});
	} else {
		cy.agregarProducto({
			codigoProducto: 1885,
			unidades: 100,
			subUnidades: 2,
		});
		// cy.agregarProducto({
		// 	codigoProducto: 17640,
		// 	unidades: 100,
		// 	subUnidades: 2,
		// });
	}
});

Y('{string} es Pedido máximo cumplido', (estadoPedidoMaximo) => {
	if (estadoPedidoMaximo === 'No') {
		cy.agregarProducto({
			codigoProducto: 1885,
			unidades: 3,
			subUnidades: 4,
		});
	} else {
		cy.agregarProducto({
			codigoProducto: 1885,
			unidades: 100,
			subUnidades: 2,
		});
	}
});

Y('el switch Credito en estado off Disabled', () => {
	// cy.get('#switch-cambiar-tipoPago-').should('not.be.checked');
	// cy.get('#switch-cambiar-tipoPago-').should('be.disabled');
});

Entonces(
	'el sistema mostrará {string}, {string} y {string}',
	(
		estadoPanelIngresoProducto,
		estadoEncendidoSwitch,
		estadoHabilitacionSwitch
	) => {
		/*
	if (estadoPanelIngresoProducto === 'No') {
		cy.get('[data-cy=codigo-producto-a-buscar]').should('be.disabled');
		cy.get('[data-cy=cantidad-producto-unidades]').should('be.disabled');
		cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.disabled');
	} else {
		cy.get('[data-cy=codigo-producto-a-buscar]').should('be.enabled');
	}
	*/
	}
);
