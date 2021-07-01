describe('Ver totales del pedido', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
		cy.visit('/');
		cy.setValuesDatosDB({
			precioConImpuestoUnidad: 100,
			precioConImpuestoSubunidad: 10,
		});
		cy.on('uncaught:exception', (err) => {
			console.log(err);
			return false;
		});
	});
	it('Ver totales del Pedido', () => {
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').type('2{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]').type('3{enter}');
			cy.get(`[data-cy=total-unidades-pedido]`).should('have.text', '2');
			cy.get('[data-cy=total-subUnidades-pedido]').should('have.text', '3');
			cy.get('[data-cy=total-monto-pedido]').should('have.text', '$ 230.00');
		});
	});
});
