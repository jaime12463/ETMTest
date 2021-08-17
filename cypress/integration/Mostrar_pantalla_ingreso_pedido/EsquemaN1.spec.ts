import {Cuando, Dado, Entonces, Y} from '../../pasos';

Dado('que el cliente tiene condición de pago contado', () => {
	cy.navegarPageInicio('2021-06-09');
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS002');
});

Y(
	'el consumido para la fecha de entrega, el informado más los pedidos de contado ya registrados, es {string} al monto de venta contado-máxima',
	(condicion) => {
		if (condicion === 'Mayor') {
			cy.agregarProducto({
				codigoProducto: 1885,
				unidades: 30,
				subUnidades: 4,
			});
		} else {
			cy.agregarProducto({
				codigoProducto: 1885,
				unidades: 11,
				subUnidades: 2,
			});
		}
	}
);

Cuando('ingreso a registrar un pedido', () => {});

Entonces(
	'El sistema mostrará {string} el panel de ingreso de producto',
	(estadoPanelIngresoProducto) => {
		if (estadoPanelIngresoProducto === 'No') {
			cy.get('[data-cy=codigo-producto-a-buscar]').should('be.disabled');
			cy.get('[data-cy=cantidad-producto-unidades]').should('be.disabled');
			cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.disabled');
		} else {
			cy.get('[data-cy=codigo-producto-a-buscar]').should('be.enabled');
		}
	}
);

Y('el switch Credito en estado off Disabled', () => {
	//verificar si deshabilita y prendido el switch
});
