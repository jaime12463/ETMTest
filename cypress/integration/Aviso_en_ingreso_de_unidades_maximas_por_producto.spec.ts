describe('Aviso en ingreso de unidades maximas por producto', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
		cy.visit('/');
		cy.on('uncaught:exception', (err) => {
			console.log(err);
			return false;
		});
	});
	it('La cantidad es mayor a la permitida', () => {
		cy.DatosDB({});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').type('101{enter}');
			cy.get('[data-cy=cantidad-es-mayor]').should('exist');
		});
	});
	it('La cantidad es menor o igual a la permitida', () => {
		cy.DatosDB({});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').type('99{enter}');
			cy.get('[data-cy=cantidad-es-mayor]').should('not.exist');
		});
	});
	it('Las unidadesMaximasVenta no está definido para el cliente', () => {
		cy.DatosDB({cantidadMaximaUnidades: null});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-unidades]').type('101{enter}');
			cy.get('[data-cy=cantidad-es-mayor]').should('not.exist');
		});
	});
});
