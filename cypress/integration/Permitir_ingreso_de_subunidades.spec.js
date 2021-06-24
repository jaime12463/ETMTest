const today = new Date();
const tomorrow = new Date(today).setDate(new Date(today).getDate() + 1);

describe('Se admite el ingreso de subunidades por cliente/producto', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.on('uncaught:exception', (err, runnable) => {
			console.log(err);
			return false;
		});
	});
	it('esVentaSubunidadesRuta en true y esVentaSubunidades en true', () => {
		cy.fixture('configuracion').then((data) => {
			data.configuraciones[0].esVentaSubunidadesRuta = true;
			cy.intercept('GET', '/femsa/configuracion', data).as('dataConfig');
		});
		cy.fixture('db').then((db) => {
			db.clientes[234].visitasPlanificadas[0].dia = today;
			db.clientes[234].fechasEntrega[0].fechaVisita = today;
			db.clientes[234].fechasEntrega[0].fechaEntrega = tomorrow;
			db.clientes[234].portafolio[0].esVentaSubunidades = true;
			cy.intercept('GET', '/femsa/tomapedidos', db).as('data');
		});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]').type('2{enter}');
			cy.get('[data-cy=total-subUnidades-pedido]').should('have.text', '2');
		});
	});
	it('esVentaSubunidadesRuta en true y esVentaSubunidades en false', () => {
		cy.fixture('configuracion').then((data) => {
			data.configuraciones[0].esVentaSubunidadesRuta = true;
			cy.intercept('GET', '/femsa/configuracion', data).as('dataConfig');
		});
		cy.fixture('db').then((db) => {
			db.clientes[234].visitasPlanificadas[0].dia = today;
			db.clientes[234].fechasEntrega[0].fechaVisita = today;
			db.clientes[234].fechasEntrega[0].fechaEntrega = tomorrow;
			db.clientes[234].portafolio[0].esVentaSubunidades = false;
			cy.intercept('GET', '/femsa/tomapedidos', db).as('data');
		});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.disabled');
		});
	});
	it('esVentaSubunidadesRuta en false y esVentaSubunidades en true', () => {
		cy.fixture('configuracion').then((data) => {
			data.configuraciones[0].esVentaSubunidadesRuta = false;
			cy.intercept('GET', '/femsa/configuracion', data).as('dataConfig');
		});
		cy.fixture('db').then((db) => {
			db.clientes[234].visitasPlanificadas[0].dia = today;
			db.clientes[234].fechasEntrega[0].fechaVisita = today;
			db.clientes[234].fechasEntrega[0].fechaEntrega = tomorrow;
			db.clientes[234].portafolio[0].esVentaSubunidades = true;
			cy.intercept('GET', '/femsa/tomapedidos', db).as('data');
		});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.disabled');
		});
	});
	it('esVentaSubunidadesRuta en false y esVentaSubunidades en false', () => {
		cy.fixture('configuracion').then((data) => {
			data.configuraciones[0].esVentaSubunidadesRuta = false;
			cy.intercept('GET', '/femsa/configuracion', data).as('dataConfig');
		});
		cy.fixture('db').then((db) => {
			db.clientes[234].visitasPlanificadas[0].dia = today;
			db.clientes[234].fechasEntrega[0].fechaVisita = today;
			db.clientes[234].fechasEntrega[0].fechaEntrega = tomorrow;
			db.clientes[234].portafolio[0].esVentaSubunidades = false;
			cy.intercept('GET', '/femsa/tomapedidos', db).as('data');
		});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]').should('be.disabled');
		});
	});
});

describe('Validar Subunidades con la presentación', () => {
	beforeEach(() => {
		cy.fixture('configuracion').then((data) => {
			data.configuraciones[0].esVentaSubunidadesRuta = true;
			cy.intercept('GET', '/femsa/configuracion', data).as('dataConfig');
		});
		cy.fixture('db').then((db) => {
			db.clientes[234].visitasPlanificadas[0].dia = today;
			db.clientes[234].fechasEntrega[0].fechaVisita = today;
			db.clientes[234].fechasEntrega[0].fechaEntrega = tomorrow;
			db.clientes[234].portafolio[0].esVentaSubunidades = true;
			db.productos[1860].presentacion = 12;
			cy.intercept('GET', '/femsa/tomapedidos', db).as('data');
		});
		cy.visit('/');
		cy.on('uncaught:exception', (err, runnable) => {
			console.log(err);
			return false;
		});
	});
	it('Presentacion en 12 - Subunidades en 11', () => {
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]').type('11{enter}');
			cy.get('[data-cy=total-subUnidades-pedido]').should('have.text', '11');
		});
	});
	it('Presentacion en 12 - Subunidades en 5', () => {
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]').type('5{enter}');
			cy.get('[data-cy=total-subUnidades-pedido]').should('have.text', '5');
		});
	});
	it('Presentacion en 12 - Subunidades en 12', () => {
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]').type('12{enter}');
			cy.get('[data-cy=total-subUnidades-pedido]').should('not.exist');
			cy.get(
				'[data-cy="Las subunidades deben ser menores a la presentación del producto"]'
			).should('exist');
		});
	});
	it('Presentacion en 12 - Subunidades en 20', () => {
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get('[data-cy=producto-tabla-0]').click();
			cy.get('[data-cy=cantidad-producto-subUnidades]').type('20{enter}');
			cy.get('[data-cy=total-subUnidades-pedido]').should('not.exist');
			cy.get(
				'[data-cy="Las subunidades deben ser menores a la presentación del producto"]'
			).should('exist');
		});
	});
});
