import {Dado, Entonces} from '../../pasos';

Dado('que se ingresó a un pedido cuyo tipo de pedido _requiereMotivo = true', () => {
	cy.navegarPageInicio('2021-06-09');
		cy.esperarDatosServidor();
		cy.oprimirBotonSplash();
		cy.ingresarCodigoCliente('HS001');
		cy.agregarProducto({
			codigoProducto: 1885,
			unidades: 10,
			subUnidades: 2
		});
		cy.get('#select-cambiar-tipo-pedido').click();
		cy.get('[data-cy=select-cambiar-tipo-pedido-1]').click();
		cy.agregarProducto({
			codigoProducto: 1885,
			unidades: 10,
			subUnidades: 2
		});
});

Entonces(
	'el sistema mostrará el producto, descripción, unidad, subunidad y el combo de selección de motivos vacíos.',
	() => {
		cy.get('[data-cy=cantidad-producto-unidades]').should('be.enabled');
		cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.enabled');
		cy.get('#select-cambiar-catalogo-motivo').should('exist');
	}
);
