import {Dado, Cuando, Y} from '../../pasos';

//Antecedentes
Dado(
	'que estoy en el ingreso del pedido',
	() => {
		cy.ingresarPageInicio('2021-06-09');

		cy.ingresarPageClientes();

		cy.ingresarCodigoCliente('HS003');
	}
);

//Escenarios compartidos
Cuando('se ingresa una cantidad', () => {});

Y('es menor o igual a la cantidad máxima de unidades', () => {});
