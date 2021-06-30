describe('Ingresar producto al pedido', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/tomapedidos').as('data');
		cy.visit('/?fecha=2021/06/17');
		cy.on('uncaught:exception', (err, runnable) => {
			console.log(err);
			return false;
		});
	});
	it('El prevendedor selecciona un producto que aún no se encuentra en el pedido', () => {
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.get(`[data-cy=codigo-cliente]`).type('120104325{enter}');
			cy.get('[data-cy=codigo-producto]').type('1860');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').should('have.value', ''); // Revisar
		});
	});
	it('El prevendedor selecciona un producto que incorporó previamente al pedido', () => {
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.get(`[data-cy=codigo-cliente]`).type('120104325{enter}');
			cy.get('[data-cy=codigo-producto]').type('1860');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').type('10{enter}');
			cy.get('[data-cy=codigo-producto]').clear();
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').should('have.value', '10');
		});
	});
});
