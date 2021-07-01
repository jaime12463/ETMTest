describe('Validar pedido minimo', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/configuracion').as('dataConfig');

		cy.visit('/');
		cy.on('uncaught:exception', (err) => {
			console.log(err);
			return false;
		});
	});
	it('El pedido no cumple con el pedido mínimo', () => {
		cy.setValuesDatosDB({montoVentaMinima: 100, precioConImpuestoUnidad: 99});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').type('1{enter}');
			cy.get('[data-cy=boton-cerrarPedido]').click();
			cy.get('[data-cy=pedido-minimo').should('exist');
		});
	});
	it('El pedido cumple con el pedido mínimo', () => {
		cy.setValuesDatosDB({montoVentaMinima: 100, precioConImpuestoUnidad: 99});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').type('100{enter}');
			cy.get('[data-cy=boton-cerrarPedido]').click();
			cy.get('[data-cy=pedido-minimo]').should('not.exist');
			cy.get('[data-cy=codigo-cliente]').should('have.text', '');
		});
	});
	it('Cliente sin monto de venta minimo', () => {
		cy.setValuesDatosDB({montoVentaMinima: null});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').type('100{enter}');
			cy.get('[data-cy=boton-cerrarPedido]').click();
			cy.get('[data-cy=pedido-minimo]').should('not.exist');
			cy.get('[data-cy=codigo-cliente]').should('have.text', '');
		});
	});
});
