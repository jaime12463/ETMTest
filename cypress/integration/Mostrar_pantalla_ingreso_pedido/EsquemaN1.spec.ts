import {Dado, Y} from '../../pasos';

Dado('que el cliente tiene condición de pago contado', () => {
	cy.navegarPageInicio('2021-06-09');
	cy.esperarDatosServidor();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS001');
});

Y(
	'el consumido para la fecha de entrega, el informado más los pedidos de contado ya registrados, es {string} al monto de venta contado-máxima',
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
