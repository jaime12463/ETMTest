describe('Eliminar línea del pedido', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
		cy.DatosDB({});
		cy.visit('/');
		cy.on('uncaught:exception', (err) => {
			console.log(err);
			return false;
		});
	});
	it('Eliminar producto del pedido', () => {
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').type('10');
			cy.get('[data-cy=cantidad-producto-subUnidades]').type('2{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').clear().type('0');
			cy.get('[data-cy=cantidad-producto-subUnidades]')
				.clear()
				.type('0{enter}');
			cy.get(`[data-cy="tarjeta-pedido"]`).should('not.exist');
		});
	});
});
