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
			cantidadMaximaUnidades?: number | null;
			presentacion?: number;
			esVentaSubunidades?: boolean;
			codigoProducto?: number;
			montoVentaMaxima?: number;
			montoVentaMinima?: number;
		};

		type TOpcionesCambiarConfiguracionDB = {
			esFrecuenciaAbierta?: boolean;
			esVentaSubunidadesRuta?: boolean;
		};

		type TOpcionesAgrearYCerrarPedido = {
			cliente?: number;
			unidades?: number;
		};

		interface Chainable {
			datosDB(opcionesCambiarDatos: TOpcionesCambiarDatosDB): void;
			datosConfiguracionDB(
				opcionesCambiarConfiguracion: TOpcionesCambiarConfiguracionDB
			): void;
			agregarYCerrarPedido(
				opcionesAgrearYCerrarPedido: TOpcionesAgrearYCerrarPedido
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
	'agregarYCerrarPedido',
	({cliente = 234, unidades = 1}: Cypress.TOpcionesAgrearYCerrarPedido) => {
		cy.get(`[data-cy=codigo-cliente]`).type(`${cliente}{enter}`);
		cy.get('[data-cy=producto-tabla-0]').click();
		cy.get('[data-cy=cantidad-producto-unidades]').type(`${unidades}{enter}`);
		cy.get('[data-cy=boton-cerrarPedido]').click();
	}
);

Cypress.Commands.add(
	'datosDB',
	({
		codigoCliente = '234',
		fechasEntrega = [{fechaVisita: today, fechaEntrega: tomorrow}],
		visitasPlanificadas = [{dia: today, secuencia: 3}],
		cantidadMaximaUnidades = 100,
		presentacion = 12,
		esVentaSubunidades = true,
		codigoProducto = 1860,
		montoVentaMaxima = 3000,
		montoVentaMinima = 100,
	}: Cypress.TOpcionesCambiarDatosDB) => {
		cy.fixture('db').then((db) => {
			db.clientes[codigoCliente].visitasPlanificadas = visitasPlanificadas;
			db.clientes[codigoCliente].fechasEntrega = fechasEntrega;
			db.clientes[codigoCliente].configuracionPedido.cantidadMaximaUnidades =
				cantidadMaximaUnidades;
			db.clientes[codigoCliente].configuracionPedido.montoVentaMaxima =
				montoVentaMaxima;
			db.clientes[codigoCliente].configuracionPedido.montoVentaMinima =
				montoVentaMinima;
			db.clientes[codigoCliente].portafolio[0].esVentaSubunidades =
				esVentaSubunidades;
			db.productos[codigoProducto].presentacion = presentacion;
			cy.intercept('GET', '/femsa/tomapedidos', db).as('data');
		});
	}
);

Cypress.Commands.add(
	'datosConfiguracionDB',
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
