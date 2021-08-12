import {Dado, Cuando, Y} from '../../pasos';

//Antecedentes
Dado(
	'que estoy en el ingreso del pedido y que se ingresó un código de producto',
	() => {
		cy.ingresarPageInicio('2021-06-09');

		cy.ingresarPageClientes();

		cy.ingresarCodigoCliente('HS001');
	}
);

Y(
	'que la cantidad máxima de unidades se estableció en 100 para el cliente',
	() => {}
);

//Escenarios compartidos
Cuando('se ingresa una cantidad', () => {});

Y('es menor o igual a la cantidad máxima de unidades', () => {});
