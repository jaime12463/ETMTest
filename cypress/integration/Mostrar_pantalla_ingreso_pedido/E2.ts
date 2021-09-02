import {Dado, Entonces, Y} from '../../pasos';

Dado('que el tipo de pedido _esValorizado = false', () => {
	cy.fixture('configuracion').then((configuracion) => {
		configuracion.configuraciones[0].tipoPedidos[0].esValorizado = false;
		configuracion.configuraciones[0].tipoPedidos[1].esValorizado = true;
		configuracion.configuraciones[0].tipoPedidos[1].esMandatorio = true;
		cy.intercept('GET', '/femsa/configuracion', configuracion).as(
			'configuracion'
		);
	});
	cy.navegarPageInicio('2021-06-09');
	cy.wait('@configuracion');
	cy.esperarDatos();
	cy.oprimirBotonSplash();
});

Y(
	'{string} hay pedido mandatorio registrado',
	(hayPedidoMandatorioRegistrado) => {
		if (hayPedidoMandatorioRegistrado === 'SI') {
			//Aca podemos verificar que este deshabilitado
			cy.agregarPedido({
				codigoCliente: 'HS002',
				opcionTipoPedido: 1,
				propsAgregarProducto: {
					codigoProducto: 1885,
					unidades: 10,
					subUnidades: 2,
				},
			});
		}
	}
);

Y('{string} hay pedido mandatorio en curso', (hayPedidoMandatorioEnCurso) => {
	if (hayPedidoMandatorioEnCurso === 'SI') {
		cy.get('#select-cambiar-tipo-pedido').click();
		cy.get('[data-cy=select-cambiar-tipo-pedido-1]').click();

		cy.agregarProducto({
			codigoProducto: 1885,
			unidades: 10,
			subUnidades: 2,
		});

		cy.get('#select-cambiar-tipo-pedido').click();
		cy.get('[data-cy=select-cambiar-tipo-pedido-0]').click();
	}
});

Entonces(
	'el sistema mostrará {string} y los totales',
	(estadoPanelIngresoProducto) => {
		if (estadoPanelIngresoProducto === 'DESHABILITADO') {
			cy.get('[data-cy=codigo-producto-a-buscar]').should('be.disabled');
			cy.get('[data-cy=cantidad-producto-unidades]').should('be.disabled');
			cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.disabled');
		} else {
			cy.get('[data-cy=codigo-producto-a-buscar]').should('be.enabled');
		}

		//TODO: Aca el total es distinto
	}
);

Y('el switch credito no se mostrará', () => {
	cy.get('#switch-cambiar-tipoPago-').should('not.exist');
});
