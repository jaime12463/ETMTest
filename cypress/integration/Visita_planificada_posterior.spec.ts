import {obtenerFechaFutura, obtenerFechaToday} from '../support/commands';

describe('Visita planificada', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.datosConfiguracionDB({});
		cy.on('uncaught:exception', (err, runnable) => {
			console.log(err);
			return false;
		});
	});
	it('dia (visitasPlanificadas) igual a la fecha actual, con frecuencia Abierta y fechaVisita (fechasEntrega) igual a dia (visitasPlanificadas)', () => {
		cy.datosDB({});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
			cy.get('[data-cy=razonSocial]').should('exist');
			cy.get('[data-cy=fechaEntrega]').should('exist'); //Aca se podria validar la fecha de entrega
		});
	});
	it('dia (visitasPlanificadas) mayor a la fecha actual, con frecuencia Abierta y fechaVisita (fechasEntrega) igual a dia (visitasPlanificadas)', () => {
		const fechaFuturoPorCinco = obtenerFechaFutura(5);
		const fechaFuturoPorSeis = obtenerFechaFutura(6);
		cy.datosDB({
			codigoCliente: '234',
			fechasEntrega: [
				{fechaVisita: fechaFuturoPorCinco, fechaEntrega: fechaFuturoPorSeis},
			],
			visitasPlanificadas: [{dia: fechaFuturoPorCinco, secuencia: 3}],
		});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
			cy.get('[data-cy=razonSocial]').should('exist');
			cy.get('[data-cy=fechaEntrega]').should('exist'); //Aca se podria validar la fecha de entrega
		});
	});
	it('dia (visitasPlanificadas) igual a la fecha actual, con frecuencia Abierta y fechaVisita (fechasEntrega) diferente a dia (visitasPlanificadas)', () => {
		const fechaActual = obtenerFechaToday();
		const fechaFuturoPorSeis = obtenerFechaFutura(6);
		const fechaFuturoPorSiete = obtenerFechaFutura(7);
		cy.datosDB({
			codigoCliente: '234',
			fechasEntrega: [
				{fechaVisita: fechaFuturoPorSeis, fechaEntrega: fechaFuturoPorSiete},
			],
			visitasPlanificadas: [{dia: fechaActual, secuencia: 3}],
		});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
			cy.get('[data-cy=razonSocial]').should('not.exist');
			cy.get('[data-cy=fechaEntrega]').should('not.exist');
			cy.get('[data-cy=no-fecha-programada]').should('exist');
		});
	});
	it('dia (visitasPlanificadas) mayor a la fecha actual, con frecuencia Abierta y fechaVisita (fechasEntrega) diferente a dia (visitasPlanificadas)', () => {
		const fechaFuturoPorCinco = obtenerFechaFutura(5);
		const fechaFuturoPorSeis = obtenerFechaFutura(6);
		const fechaFuturoPorSiete = obtenerFechaFutura(7);
		cy.datosDB({
			codigoCliente: '234',
			fechasEntrega: [
				{fechaVisita: fechaFuturoPorSeis, fechaEntrega: fechaFuturoPorSiete},
			],
			visitasPlanificadas: [{dia: fechaFuturoPorCinco, secuencia: 3}],
		});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
			cy.get('[data-cy=razonSocial]').should('not.exist');
			cy.get('[data-cy=fechaEntrega]').should('not.exist');
			cy.get('[data-cy=no-fecha-programada]').should('exist');
		});
	});
});
