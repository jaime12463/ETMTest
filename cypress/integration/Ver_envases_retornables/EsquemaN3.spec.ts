import {Cuando, Entonces, Dado, Y} from '../../pasos';

Dado('que se realizó la venta de {string} mayores a cero del {string}', (cantidadUnidades, producto) => {
	cy.navegarPageInicio('2021-06-09');
	cy.esperarDatosServidor();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS001');
});

Y('éste tiene {string} informado', (implicito2) => {

});


Entonces('el sistema mostrará {string} con {string} para retorno', (implicito2, cantidadUnidades) => {
    
});