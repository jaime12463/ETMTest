const today = new Date();
const tomorrow = new Date(today).setDate(new Date(today).getDate() + 1);

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
		cy.fixture('db').then((db) => {
			db.clientes[234].fechasEntrega[0].fechaVisita = today;
			db.clientes[234].fechasEntrega[0].fechaEntrega = tomorrow;
			cy.intercept('GET', '/femsa/tomapedidos', db).as('data');
		});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=${tomorrow}]`).should('exist');
		});
	});
	it('Cliente sin fecha de entrega calculada', () => {
		cy.fixture('db').then((db) => {
			db.clientes[234].fechasEntrega[0].fechaVisita = tomorrow;
			cy.intercept('GET', '/femsa/tomapedidos', db).as('data');
		});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=noFechaProgramada]`).should('exist');
			cy.get(`[data-cy=${tomorrow}]`).should('not.exist');
		});
	});
});
