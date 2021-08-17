import {Cuando, Entonces, Y} from '../../pasos';

Cuando('se ingresa una cantidad y las subunidades están habilitadas', () => {
	cy.agregarProducto({
		codigoProducto: 420,
		unidades: 4,
		subUnidades: 4,
	});
});

Y('las subunidades están habilitadas', () => {});

Entonces(
	'el sistema registrará las unidades y continuará con el ingreso de las subunidades',
	() => {}
);
