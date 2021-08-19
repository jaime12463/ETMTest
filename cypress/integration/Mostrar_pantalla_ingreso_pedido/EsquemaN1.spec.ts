import {Cuando, Dado, Y} from '../../pasos';

Dado('que el cliente tiene condición de pago contado', () => {
	cy.navegarPageInicio('2021-06-09');
	cy.esperarDatosServidor();
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

Y('el switch Credito en estado off Disabled', () => {
	cy.get('#switch-cambiar-tipoPago-').should('not.be.checked');
	cy.get('#switch-cambiar-tipoPago-').should('be.disabled');
});
