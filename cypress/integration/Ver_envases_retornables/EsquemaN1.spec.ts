import {Cuando, Entonces, Dado, Y} from '../../pasos';

Dado('que se realizó la venta de un producto', () => {
	cy.navegarPageInicio('2021-06-09');
	cy.esperarDatosServidor();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS001');
});

Y('que el producto no es promo push', () => {});

Y('no tiene _Implícito1', () => {});

Y('tampoco tiene _Implícito2 informados', () => {});


Cuando('quiero ver los envases retornables', () => {

});

Entonces('el sistema no muestra envases para ese producto', () => {});