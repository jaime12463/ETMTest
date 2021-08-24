import {Cuando, Entonces} from '../../pasos';

Cuando('se ingresa {int} mayor a la cantidad disponible del producto para el cliente', (unidades) => {
	cy.agregarProducto({
		codigoProducto: 420,
		unidades,
	});
});

Entonces(
	'el sistema mostrará el mensaje “La cantidad es mayor al disponible: 10” y permanece en el campo para que el prevendedor pueda corregir la cantidad',
	() => {
		cy.get('[data-cy=excede-disponible]').should('exist');
	}
);
