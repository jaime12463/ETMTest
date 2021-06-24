describe('cálculo de fecha de entrega', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/configuracion').as('dataConfig');

		cy.visit('/');
		cy.on('uncaught:exception', (err, runnable) => {
			console.log(err);
			return false;
		});
	});
	it('Cliente con fecha de entrega calculada', () => {
		cy.configDB({cliente: 234});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=fechaEntrega]`).should('exist');
		});
	});
	it('Cliente sin fecha de entrega calculada', () => {
		cy.intercept('GET', '/femsa/tomapedidos').as('data');
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=noFechaProgramada]`).should('exist');
			cy.get(`[data-cy=fechaEntrega]`).should('not.exist');
		});
	});
});
