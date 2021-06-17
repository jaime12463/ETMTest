describe('clientes fuera de frecuencia', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/tomapedidos').as('data');
		cy.intercept('GET', '/femsa/configuracion', {fixture: 'configuracion'}).as(
			'dataConfig'
		);
		cy.visit('/');
		cy.on('uncaught:exception', (err, runnable) => {
			console.log(err);
			return false;
		});
	});
	it('Visita a cliente en frecuencia', () => {
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig').then(({response}) => {
				expect(response.body.configuraciones[0].esFrecuenciaAbierta).eql(true);
			});
			cy.get(`[data-cy=codigo-cliente]`).type('120104325{enter}');
			cy.get(`[data-cy=alerta-frecuencia]`).should('not.exist');
		});
	});
	it('Visita a cliente fuera de frecuencia', () => {
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig').then(({response}) => {
				expect(response.body.configuraciones[0].esFrecuenciaAbierta).eql(true);
			});
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=alerta-frecuencia]`).should('not.exist');
		});
	});
});
