import {Dado, Cuando, Entonces} from '../../pasos';

Dado('que se cuenta con una lista de clientes', () => {
	cy.navegarPageInicio('2021-06-09');
	cy.esperarDatosServidor();
	cy.oprimirBotonSplash();
});

Cuando(
	'el usuario ingresa un código de cliente que no está en la lista de clientes',
	() => {
		cy.ingresarCodigoCliente('codigoNoExistente');
	}
);

Entonces(
	'el sistema mostrará el mensaje: “El código ingresado no corresponde a un cliente”',
	() => {
		cy.get('[data-cy=clienteNoPortafolio]').should('exist');
	}
);
