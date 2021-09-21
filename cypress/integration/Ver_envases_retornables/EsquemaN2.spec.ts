import {Cuando, Entonces, Dado, Y} from '../../pasos';

Dado('que se realizó la venta de {string} y {string} de {string}', (cantidadUnidades, cantidadSubunidades, producto) => {
	cy.navegarPageInicio('2021-06-09');
	cy.esperarDatosServidor();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS001');
});

Y('éste tiene {string} informado', (implicito1) => {

});

Entonces('el sistema mostrará {string} con {string} y {string} para retorno', (implicito1, cantidadUnidades, cantidadSubunidades) => {

});