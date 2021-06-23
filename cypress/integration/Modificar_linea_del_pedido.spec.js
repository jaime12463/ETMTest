const today = new Date();
const tomorrow = new Date(today).setDate(new Date(today).getDate() + 1);
describe('Modificar lina del pedido', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
		cy.fixture('db').then((db) => {
			db.clientes[234].fechasEntrega[0].fechaVisita = today;
			db.clientes[234].fechasEntrega[0].fechaEntrega = tomorrow;
			cy.intercept('GET', '/femsa/tomapedidos', db).as('data');
		});
		cy.visit('/');

		cy.on('uncaught:exception', (err) => {
			console.log(err);
			return false;
		});
	});
	it('Modificar cantidades en unidades', () => {
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').type('5{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').clear().type('10{enter}');
			cy.get(`[data-cy=total-unidades-pedido]`).should('have.text', '10');
			cy.get('[data-cy=total-monto-pedido]').should('have.text', '$ 1050.00');
		});
	});
	it('Modificar cantidades en subunidades', () => {
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]').type('1{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]')
				.clear()
				.type('2{enter}');
			cy.get('[data-cy=total-subUnidades-pedido]').should('have.text', '2');
			cy.get('[data-cy=total-monto-pedido]').should('have.text', '$ 17.50');
		});
	});
});
