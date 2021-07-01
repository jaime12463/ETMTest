describe('Ver actividad realizada del cliente', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
		cy.visit('/');
		cy.on('uncaught:exception', (err) => {
			console.log(err);
			return false;
		});
	});
	it('El Cliente tiene varios pedidos hechos en la misma fecha de entrega', () => {
		cy.datosDB({});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.agregarUnPedido({unidades: 5, cerrarPedido: true});
			cy.get(`[data-cy=codigo-cliente]`).clear();
			cy.agregarUnPedido({unidades: 3, cerrarPedido: false});
			cy.get('[data-cy=pedidosCliente]').should('exist');
			cy.get('[data-cy=numeroPedidosCliente-1]').should('exist');
		});
	});
	it('El Cliente no tiene pedidos previos hechos en la misma fecha de entrega', () => {
		cy.datosDB({});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.agregarUnPedido({unidades: 5, cerrarPedido: false});
			cy.get('[data-cy=pedidosCliente]').should('not.exist');
		});
	});
});
