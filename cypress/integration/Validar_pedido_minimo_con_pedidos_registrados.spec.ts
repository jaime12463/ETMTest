describe('validar pedido mínimo con pedidos registrados', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
		cy.visit('/');
		cy.on('uncaught:exception', (err) => {
			console.log(err);
			return false;
		});
	});
	it('Primer pedido del cliente para una fecha de entrega - Valida si el pedido cumple con el monto minimo', () => {
		cy.datosDB({montoVentaMinima: 1000});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.agregarUnPedido({unidades: 3, cerrarPedido: true});
			cy.get('[data-cy=pedido-minimo]').should('exist');
			cy.get(
				'.MuiDialogActions-root > .MuiButtonBase-root > .MuiButton-label'
			).click();
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').clear().type(`10{enter}`);
			cy.get('[data-cy=boton-cerrarPedido]').click();
			cy.get('[data-cy=pedido-minimo]').should('not.exist');
		});
	});
	it('Otros pedidos del cliente para una misma fecha de entrega - No valida si el pedido cumple con el monto minimo', () => {
		cy.datosDB({montoVentaMinima: 1000});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.agregarUnPedido({unidades: 10, cerrarPedido: true});
			cy.get(`[data-cy=codigo-cliente]`).clear();
			cy.agregarUnPedido({unidades: 1, cerrarPedido: true});
			cy.get('[data-cy=pedido-minimo]').should('not.exist');
		});
	});
});
