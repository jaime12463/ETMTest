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
			cy.agregarUnPedido({unidades: 5, cerrarPedido: true});
			cy.get(`[data-cy=codigo-cliente]`).clear();
			cy.agregarUnPedido({unidades: 3, cerrarPedido: true});
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
			cy.agregarUnPedido({unidades: 5, cerrarPedido: true});
			cy.get(`[data-cy=codigo-cliente]`).clear();
			cy.agregarUnPedido({unidades: 5, cerrarPedido: true});
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
			cy.agregarUnPedido({unidades: 5, cerrarPedido: true});
			cy.get(`[data-cy=codigo-cliente]`).clear();
			cy.agregarUnPedido({unidades: 5, cerrarPedido: true});
			cy.get('[data-cy=monto-maximo]').should('exist');
		});
	});
});
