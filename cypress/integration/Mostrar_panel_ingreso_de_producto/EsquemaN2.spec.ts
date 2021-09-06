import {Dado, Entonces} from '../../pasos';

Dado('que se ingresó a un pedido cuyo tipo de pedido _requiereMotivo = false', () => {
	cy.navegarPageInicio('2021-06-09');
	cy.esperarDatosServidor();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS001');
	cy.agregarProducto({
		codigoProducto: 1885,
		unidades: 0,
		subUnidades: 0
	});
});

Entonces(
	'el sistema mostrará el producto, descripción, unidad, subunidad, el precio unidad y el precio subunidad vacíos.',
	() => {
		cy.get('[data-cy=cantidad-producto-unidades]').should('be.enabled');
		cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.enabled');
		cy.get('#select-cambiar-catalogo-motivo').should('not.exist');
	}
);
