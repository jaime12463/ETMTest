import {Entonces, Dado} from '../../pasos';

Dado('que se capturó el siguiente pedido', () => {
	cy.navegarPageInicio('2021-06-09');
	cy.esperarDatosServidor();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS001');
});

Entonces('el sistema mostrará', () => {
    
});