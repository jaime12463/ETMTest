describe('Ver detalle del pedido', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
		cy.setValuesDatosDB({});
		cy.visit('/');
		cy.on('uncaught:exception', (err) => {
			console.log(err);
			return false;
		});
	});
	it('Ver detalle del pedido', () => {
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').type('5{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]').type('10{enter}');
			cy.get('[data-cy=boton-detalle-pedido]').click();
			cy.get('[data-cy=detalle-codigo-producto]').should('have.text', '1860');
			cy.get('[data-cy=detalle-nombre-producto]').should(
				'have.text',
				'YOLI LIMON BOT 600L NR 12PK'
			);
			cy.get('[data-cy=detalle-unidades-producto]').should('have.text', '5');
			cy.get('[data-cy=detalle-subUnidades-producto]').should(
				'have.text',
				'10'
			);
		});
	});
});
