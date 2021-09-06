import {Dado, Entonces, Y, Cuando} from '../../pasos';

Dado(
	'el tipo de pedido seleccionado es de un tipo de pedido _esValorizado = true',
	() => {
		cy.fixture('configuracion').then((configuracion) => {
			configuracion.configuraciones[0].tipoPedidos[0].esValorizado = true;
			cy.intercept('GET', '/femsa/configuracion', configuracion).as(
				'configuracion'
			);
		});
		cy.navegarPageInicio('2021-06-09');
		cy.wait('@configuracion');
		cy.esperarDatos();
		cy.oprimirBotonSplash();
	}
);

Cuando(
	'ingreso a registrar un pedido con un cliente en condición de pago contado',
	() => {
		cy.ingresarCodigoCliente('HS001');
	}
);

Y(
	'el consumido para la fecha de entrega, el informado más los pedidos de contado ya registrados, es {string} al _montoVentaContadoMaxima',
	(condicion) => {
		//TODO: Aca faltaria testear que si suma pedidos anteriores
		let unidades = 11;

		if (condicion === 'Mayor') unidades = 30;

		cy.agregarProducto({
			codigoProducto: 1885,
			unidades,
			subUnidades: 4,
		});
	}
);

Y('el switch Credito en estado off Disabled', () => {
	cy.get('#switch-cambiar-tipoPago-').should('not.be.checked');
	cy.get('#switch-cambiar-tipoPago-').should('be.disabled');
});

Y(
	'mostrará el combo de seleccion del tipo de pedido cargado con la _descripcion de los _tipoPedidoHabilitados del cliente, ordenados por _secuencia ascendente y mostrara como valor default la _decripcion del tipo de pedido cuyo _esValorizado = true.',
	() => {
		cy.get('#select-cambiar-tipo-pedido').contains('Venta');
		cy.get('#select-cambiar-tipo-pedido').click();
		cy.get('[data-cy=select-cambiar-tipo-pedido-0]').contains('Venta');
		cy.get('[data-cy=select-cambiar-tipo-pedido-1]').contains('Canje');
	}
);
