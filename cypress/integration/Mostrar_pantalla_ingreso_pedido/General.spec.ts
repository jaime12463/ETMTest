import {Cuando, Entonces} from '../../pasos';

Cuando('ingreso a registrar un pedido', () => {
	//Este no es tan general, que cliente se deberia ingresar?
	cy.ingresarCodigoCliente('HS002');
});

Entonces('el sistema mostrará {string}', (estadoPanelIngresoProducto) => {
	if (estadoPanelIngresoProducto === 'No') {
		cy.get('[data-cy=codigo-producto-a-buscar]').should('be.disabled');
		cy.get('[data-cy=cantidad-producto-unidades]').should('be.disabled');
		cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.disabled');
	} else {
		cy.get('[data-cy=codigo-producto-a-buscar]').should('be.enabled');
	}
});
