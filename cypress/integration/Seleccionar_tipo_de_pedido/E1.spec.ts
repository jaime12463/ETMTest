import {Dado, Cuando, Entonces} from '../../pasos';

Dado('que se ingresó al cliente', () => {
	cy.fixture('configuracion').then((configuracion) => {
		configuracion.configuraciones[0].tipoPedidos[1].descripcion = 'TEST';
		cy.intercept('GET', '/femsa/configuracion', configuracion).as(
			'configuracion'
		);
	});
	cy.navegarPageInicio('2021-06-09');
	cy.wait('@configuracion');
	cy.esperarDatos();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS001');
});

Cuando('selecciono un tipo de pedido', () => {
	cy.get('.MuiSelect-root').click();
	cy.get('[data-cy=select-cambiar-tipo-pedido-1]').click();
});

Entonces(
	'el sistema mostrará la pantalla según el tipo de pedido seleccionado.',
	() => {
		cy.get('.MuiSelect-root').contains('TEST');
	}
);
