declare global {
	namespace Cypress {
		type TVisitaPlanificada = {
			dia: string;
			secuencia: number;
		};

		type TFechaEntrega = {
			fechaVisita: string;
			fechaEntrega: string;
		};

		type TCodigoCliente = string;

		type TOpcionesCambiarDatosDB = {
			codigoCliente?: string;
			fechasEntrega?: TFechaEntrega[];
			visitasPlanificadas?: TVisitaPlanificada[];
			cantidadMaximaUnidades?: number;
			presentacion?: number;
			esVentaSubunidades?: boolean;
			codigoProducto?: number;
		};

		type TOpcionesCambiarConfiguracionDB = {
			esFrecuenciaAbierta?: boolean;
			esVentaSubunidadesRuta?: boolean;
		};

		interface Chainable {
			setValuesDatosDB(opcionesCambiarDatos: TOpcionesCambiarDatosDB): void;
			setValuesConfiguracionDB(
				opcionesCambiarConfiguracion: TOpcionesCambiarConfiguracionDB
			): void;
		}
	}
}

export const obtenerFechaToday = (): string => {
	const today: Date = new Date();
	const todayFormateado: string = today.toISOString().split('T')[0];

	return todayFormateado;
};

export const obtenerFechaFutura = (diasAumento: number): string => {
	const tomorrow: Date = new Date(
		new Date().setDate(new Date().getDate() + diasAumento)
	);
	const tomorrowFormateado: string = tomorrow.toISOString().split('T')[0];
	return tomorrowFormateado;
};

const today = obtenerFechaToday();
const tomorrow = obtenerFechaFutura(1);

Cypress.Commands.add(
	'setValuesDatosDB',
	({
		codigoCliente = '234',
		fechasEntrega = [{fechaVisita: today, fechaEntrega: tomorrow}],
		visitasPlanificadas = [{dia: today, secuencia: 3}],
		cantidadMaximaUnidades = 100,
		presentacion = 12,
		esVentaSubunidades = true,
		codigoProducto = 1860,
	}: Cypress.TOpcionesCambiarDatosDB) => {
		cy.fixture('db').then((db) => {
			db.clientes[codigoCliente].visitasPlanificadas = visitasPlanificadas;
			db.clientes[codigoCliente].fechasEntrega = fechasEntrega;
			db.clientes[
				codigoCliente
			].configuracionPedido.cantidadMaximaUnidades = cantidadMaximaUnidades;
			db.clientes[
				codigoCliente
			].portafolio[0].esVentaSubunidades = esVentaSubunidades;
			db.productos[codigoProducto].presentacion = presentacion;
			cy.intercept('GET', '/femsa/tomapedidos', db).as('data');
		});
	}
);

Cypress.Commands.add(
	'setValuesConfiguracionDB',
	({
		esFrecuenciaAbierta = true,
		esVentaSubunidadesRuta = true,
	}: Cypress.TOpcionesCambiarConfiguracionDB) => {
		cy.fixture('configuracion').then((data) => {
			data.configuraciones[0].esFrecuenciaAbierta = esFrecuenciaAbierta;
			data.configuraciones[0].esVentaSubunidadesRuta = esVentaSubunidadesRuta;
			cy.intercept('GET', '/femsa/configuracion', data).as('dataConfig');
		});
	}
);

export {};
