import {Cuando, Entonces, Y} from '../../pasos';

//E2 - E1
Cuando('ingreso a registrar un pedido', () => {
	cy.ingresarCodigoCliente('HS002');
});

//E3 - E4
Entonces('el sistema mostrará {string}', (estadoPanelIngresoProducto) => {
	if (estadoPanelIngresoProducto === 'No') {
		cy.get('[data-cy=codigo-producto-a-buscar]').should('be.disabled');
		cy.get('[data-cy=cantidad-producto-unidades]').should('be.disabled');
		cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.disabled');
	} else {
		cy.get('[data-cy=codigo-producto-a-buscar]').should('be.enabled');
	}
});

//E3 - E4 - E5
Y(
	'mostrará el combo de seleccion del tipo de pedido cargado con la _descripcion de los _tipoPedidoHabilitados del cliente, ordenados por _secuencia ascendente y mostrara como valor default la _decripcion del tipo de pedido cuyo _esValorizado = true.',
	() => {
		cy.get('#select-cambiar-tipo-pedido').contains('Venta');
		cy.get('#select-cambiar-tipo-pedido').click();
		cy.get('[data-cy=select-cambiar-tipo-pedido-0]').contains('Venta');
		cy.get('[data-cy=select-cambiar-tipo-pedido-1]').contains('Canje');
	}
);

//E5 - E6
Cuando(
	'ingreso a registrar un pedido con un cliente en condición de pago crédito informal',
	() => {
		cy.ingresarCodigoCliente('HS003');
	}
);

Y('{string} es Pedido máximo cumplido', (estadoPedidoMaximo) => {
	if (estadoPedidoMaximo == 'Si') {
		cy.agregarProducto({
			unidades: 35,
			subUnidades: 1,
			codigoProducto: 1885,
		});
		cy.get('#switch-cambiar-tipoPago-1885').click();
	}
});

Entonces(
	'el sistema mostrará {string}, {string} y {string}',
	(
		estadoPanelIngresoProducto,
		estadoEncendidoSwitch,
		estadoHabilitacionSwitch
	) => {
		if (estadoPanelIngresoProducto === 'DESHABILITADO') {
			cy.get('[data-cy=codigo-producto-a-buscar]').should('be.disabled');
			cy.get('[data-cy=cantidad-producto-unidades]').should('be.disabled');
			cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.disabled');
		} else {
			cy.get('[data-cy=codigo-producto-a-buscar]').should('be.enabled');
		}

		if (estadoEncendidoSwitch == 'on') {
			cy.get('#switch-cambiar-tipoPago-').should('be.checked');
		} else {
			cy.get('#switch-cambiar-tipoPago-').should('not.be.checked');
		}

		if (estadoHabilitacionSwitch == 'enabled') {
			cy.get('#switch-cambiar-tipoPago-').should('be.enabled');
		} else {
			cy.get('#switch-cambiar-tipoPago-').should('be.disabled');
		}
	}
);
