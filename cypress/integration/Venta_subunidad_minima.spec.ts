describe('Venta por subunidad minima', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
		cy.visit('/');
		cy.on('uncaught:exception', (err) => {
			console.log(err);
			return false;
		});
	});
	it('Ingreso subunidad multiplo', () => {
		cy.datosDB({subunidadesVentaMinima: 3});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]')
				.clear()
				.type('3{enter}');
			cy.get('[data-cy=sub-unidades-no-multiplo]').should('not.exist');
		});
	});
	it('Ingreso subunidad no multiplo', () => {
		cy.datosDB({subunidadesVentaMinima: 3});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]')
				.clear()
				.type('2{enter}');
			cy.get('[data-cy=sub-unidades-no-multiplo]').should('exist');
		});
	});
});
