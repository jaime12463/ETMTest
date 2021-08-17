import {Dado, Entonces, Y} from '../../pasos';

Dado('que el cliente tiene condición de pago crédito formal y {string}', () => {
	cy.navegarPageInicio('2021-06-09');
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS002');
});

Entonces('el sistema {string}', () => {});

Y('el switch en estado On Disabled', () => {
	//verificar si deshabilita y prendido el switch
});
