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
			precioConImpuestoUnidad?: number;
			precioConImpuestoSubunidad?: number;
			montoVentaMinima?: number | null;
			montoVentaMaxima?: number;
		};

		type TOpcionesCambiarConfiguracionDB = {
			esFrecuenciaAbierta?: boolean;
			esVentaSubunidadesRuta?: boolean;
		};

		type TOpcionesAgregarUnPedido = {
			cliente?: number;
			unidades?: number;
			cerrarPedido?: boolean;
		};

		interface Chainable {
			datosDB(opcionesCambiarDatos: TOpcionesCambiarDatosDB): void;
			datosConfiguracionDB(
				opcionesCambiarConfiguracion: TOpcionesCambiarConfiguracionDB
			): void;
			agregarUnPedido(opcionesagregarUnPedido: TOpcionesAgregarUnPedido): void;
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
	'agregarUnPedido',
	({
		cliente = 234,
		unidades = 1,
		cerrarPedido = false,
	}: Cypress.TOpcionesAgregarUnPedido) => {
		cy.get(`[data-cy=codigo-cliente]`).type(`${cliente}{enter}`);
		cy.get('[data-cy=producto-tabla-0]').click();
		cy.get('[data-cy=cantidad-producto-unidades]').type(`${unidades}{enter}`);
		if (cerrarPedido) {
			cy.get('[data-cy=boton-cerrarPedido]').click();
		}
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
		precioConImpuestoUnidad = 100,
		precioConImpuestoSubunidad = 10,
		montoVentaMaxima = 3000,
		montoVentaMinima = 100,
	}: Cypress.TOpcionesCambiarDatosDB) => {
		cy.fixture('db').then((db) => {
			db.clientes[codigoCliente].visitasPlanificadas = visitasPlanificadas;
			db.clientes[codigoCliente].fechasEntrega = fechasEntrega;
			db.clientes[
				codigoCliente
			].configuracionPedido.cantidadMaximaUnidades = cantidadMaximaUnidades;
			db.clientes[
				codigoCliente
			].configuracionPedido.montoVentaMinima = montoVentaMinima;
			db.clientes[
				codigoCliente
			].portafolio[0].esVentaSubunidades = esVentaSubunidades;
			db.clientes[
				codigoCliente
			].configuracionPedido.montoVentaMaxima = montoVentaMaxima;
			db.productos[codigoProducto].presentacion = presentacion;
			db.clientes[234].portafolio[0].precios[1].precioConImpuestoUnidad = precioConImpuestoUnidad;
			db.clientes[234].portafolio[0].precios[1].precioConImpuestoSubunidad = precioConImpuestoSubunidad;
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
