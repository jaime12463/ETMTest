import {obtenerFechaFutura, obtenerFechaToday} from '../support/commands';

describe('cálculo de fecha de entrega', () => {
	beforeEach(() => {
		cy.intercept('GET', '/femsa/configuracion').as('dataConfig');
		cy.visit('/');
		cy.on('uncaught:exception', (err, runnable) => {
			console.log(err);
			return false;
		});
	});
	it('dia (visitasPlanificadas) igual a la fecha actual, con frecuencia Cerrada y fechaVisita (fechasEntrega) igual a dia (visitasPlanificadas)', () => {
		cy.datosConfiguracionDB({esFrecuenciaAbierta: false});
		cy.datosDB({});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=fechaEntrega]`).should('exist');
			cy.get(`[data-cy=no-fecha-programada]`).should('not.exist');
			cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
		});
	});
	it('dia (visitasPlanificadas) igual a la fecha actual, con frecuencia Cerrada y fechaVisita (fechasEntrega) diferente a dia (visitasPlanificadas)', () => {
		cy.datosConfiguracionDB({esFrecuenciaAbierta: false});
		const fechaActual = obtenerFechaToday();
		const fechaFuturoUno = obtenerFechaFutura(1);
		const fechaFuturoDos = obtenerFechaFutura(2);
		cy.datosDB({
			codigoCliente: '234',
			fechasEntrega: [
				{fechaVisita: fechaFuturoUno, fechaEntrega: fechaFuturoDos},
			],
			visitasPlanificadas: [{dia: fechaActual, secuencia: 3}],
		});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=no-fecha-programada]`).should('exist');
			cy.get(`[data-cy=fechaEntrega]`).should('not.exist');
			cy.get(`[data-cy=fuera-frecuencia]`).should('not.exist');
		});
	});
	it('dia (visitasPlanificadas) mayor a la fecha actual, con frecuencia Cerrada y fechaVisita (fechasEntrega) igual a dia (visitasPlanificadas)', () => {
		cy.datosConfiguracionDB({esFrecuenciaAbierta: false});
		const fechaFuturoUno = obtenerFechaFutura(1);
		const fechaFuturoDos = obtenerFechaFutura(2);
		cy.datosDB({
			codigoCliente: '234',
			fechasEntrega: [
				{fechaVisita: fechaFuturoUno, fechaEntrega: fechaFuturoDos},
			],
			visitasPlanificadas: [{dia: fechaFuturoUno, secuencia: 3}],
		});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=no-fecha-programada]`).should('not.exist');
			cy.get(`[data-cy=fechaEntrega]`).should('not.exist');
			cy.get(`[data-cy=fuera-frecuencia]`).should('exist');
		});
	});
	it('dia (visitasPlanificadas) mayor a la fecha actual, con frecuencia Cerrada y fechaVisita (fechasEntrega) diferente a dia (visitasPlanificadas)', () => {
		cy.datosConfiguracionDB({esFrecuenciaAbierta: false});
		const fechaFuturoUno = obtenerFechaFutura(1);
		const fechaFuturoDos = obtenerFechaFutura(2);
		const fechaFuturoTres = obtenerFechaFutura(2);
		cy.datosDB({
			codigoCliente: '234',
			fechasEntrega: [
				{fechaVisita: fechaFuturoDos, fechaEntrega: fechaFuturoTres},
			],
			visitasPlanificadas: [{dia: fechaFuturoUno, secuencia: 3}],
		});
		cy.fixture('pagesElements').then((element) => {
			cy.get(element.splash.name).should('contain', element.splash.value);
			cy.get(element.splash.logoBox).click();
			cy.wait('@data');
			cy.wait('@dataConfig');
			cy.get(`[data-cy=codigo-cliente]`).type('234{enter}');
			cy.get(`[data-cy=no-fecha-programada]`).should('not.exist');
			cy.get(`[data-cy=fechaEntrega]`).should('not.exist');
			cy.get(`[data-cy=fuera-frecuencia]`).should('exist');
		});
	});
});
