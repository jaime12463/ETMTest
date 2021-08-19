import {Dado, Y} from '../../pasos';

//Antecedentes
Dado(
	'que estoy en el ingreso del pedido y que se ingresó un código de producto',
	() => {
		cy.navegarPageInicio('2021-06-09');
		cy.esperarDatosServidor();
		cy.oprimirBotonSplash();
		cy.ingresarCodigoCliente('HS001');
	}
);

Y(
	'que la cantidad máxima de unidades se estableció en 100 para el cliente',
	() => {
		//Aca se podria hacer la intercepcion si fuera necesario?
	}
);

//Escenarios compartidos
Y('es menor o igual a la cantidad máxima de unidades', () => {});
