describe('Validar pedido maximo', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
		cy.visit('/');
		cy.on('uncaught:exception', (err) => {
			console.log(err);
			return false;
		});
	});
	it('montoVentaMaxima en 1000 - Monto Total en 945', () => {
		cy.datosDB({montoVentaMaxima: 1000});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.agregarYCerrarPedido({unidades: 5});
			cy.get(`[data-cy=codigo-cliente]`).clear();
			cy.agregarYCerrarPedido({unidades: 3});
			cy.get('[data-cy=monto-maximo]').should('not.exist');
		});
	});
	it('montoVentaMaxima en 1050 - Monto Total en 1050', () => {
		cy.datosDB({montoVentaMaxima: 1050});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.agregarYCerrarPedido({unidades: 5});
			cy.get(`[data-cy=codigo-cliente]`).clear();
			cy.agregarYCerrarPedido({unidades: 5});
			cy.get('[data-cy=monto-maximo]').should('not.exist');
		});
	});
	it('montoVentaMaxima en 1000 - Monto Total en 1050', () => {
		cy.datosDB({montoVentaMaxima: 1000});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.agregarYCerrarPedido({unidades: 5});
			cy.get(`[data-cy=codigo-cliente]`).clear();
			cy.agregarYCerrarPedido({unidades: 5});
			cy.get('[data-cy=monto-maximo]').should('exist');
		});
	});
});
