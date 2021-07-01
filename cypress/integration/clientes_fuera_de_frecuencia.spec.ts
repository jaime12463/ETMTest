describe('clientes fuera de frecuencia', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.on('uncaught:exception', (err, runnable) => {
			console.log(err);
			return false;
		});
	});
	it('Visita a cliente con visita planificada en frecuencia Abierta', () => {
		cy.setValuesConfiguracionDB({});
		cy.setValuesDatosDB({});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
			cy.get('[data-cy=razonSocial]').should('exist');
		});
	});
	it('Visita a cliente con visita planificada  en frecuencia Cerrada', () => {
		cy.setValuesConfiguracionDB({esFrecuenciaAbierta: false});
		cy.setValuesDatosDB({});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
			cy.get('[data-cy=razonSocial]').should('exist');
		});
	});
	it('Visita a a cliente sin visita planificada con frecuencia Abierta', () => {
		cy.setValuesConfiguracionDB({});
		cy.setValuesDatosDB({codigoCliente: '120104325'});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('120104325{enter}');
			cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
			cy.get('[data-cy=razonSocial]').should('exist');
		});
	});
});
