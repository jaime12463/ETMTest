declare global {
	namespace Cypress {
		type TPropsFunctionAgregarProducto = {
			codigoProducto: number;
			unidades: number;
			subUnidades?: number;
		};

		type TPropsFunctionAgregarPedido = {
			codigoCliente: string;
			opcionTipoPedido?: number;
			propsAgregarProducto: TPropsFunctionAgregarProducto;
		};
		interface Chainable {
			oprimirBotonSplash(): void;
			navegarPageInicio(fechaActual: string): void;
			agregarProducto(
				propsAgregarProducto: TPropsFunctionAgregarProducto
			): void;
			agregarPedido(propsAgregarPedido: TPropsFunctionAgregarPedido): void;
			ingresarCodigoCliente(codigoCliente: string): void;
			ingresarCodigoProducto(codigoProducto: number): void;
			ingresarUnidades(unidades: number): void;
			ingresarSubUnidades(subUnidades: number): void;
			esperarDatosServidor(): void;
			esperarDatos(): void;
			esperarConfiguracion(): void;
			oprimirBotonAtras(): void;
			oprimirBotonCerrarPedido(): void;
			oprimirBotonVerEnvases(): void;
			avanzarPasoSiguiente(): void;
		}
	}
}

export const obtenerFecha = (diasAumento?: number): string => {
	const tomorrow: Date = new Date(
		new Date().setDate(new Date().getDate() + (diasAumento ?? 0))
	);
	const tomorrowFormateado: string = tomorrow.toISOString().split('T')[0];
	return tomorrowFormateado;
};

Cypress.Commands.add(
	'agregarProducto',
	({
		codigoProducto,
		unidades,
		subUnidades,
	}: Cypress.TPropsFunctionAgregarProducto) => {
		cy.get('[data-cy=expandir-TomaDePedido] > .makeStyles-arrow-24').click();
		cy.ingresarCodigoProducto(codigoProducto);
		cy.ingresarUnidades(unidades);
		if (subUnidades) cy.ingresarSubUnidades(subUnidades);
		//nTODO: fix
	}
);

Cypress.Commands.add(
	'agregarPedido',
	({
		codigoCliente,
		opcionTipoPedido,
		propsAgregarProducto,
	}: Cypress.TPropsFunctionAgregarPedido) => {
		cy.ingresarCodigoCliente(codigoCliente);
		if (opcionTipoPedido) {
			cy.get('#select-cambiar-tipo-pedido').click();
			cy.get(
				`[data-cy=select-cambiar-tipo-pedido-${opcionTipoPedido}]`
			).click();
		}
		cy.agregarProducto(propsAgregarProducto);
		cy.oprimirBotonCerrarPedido();
	}
);

Cypress.Commands.add('ingresarCodigoCliente', (codigoCliente: string) => {
	cy.get(`[data-cy=codigo-cliente]`).type(`${codigoCliente}{enter}`);
});

Cypress.Commands.add('ingresarCodigoProducto', (codigoProducto: number) => {
	cy.get('[data-cy=codigo-producto-a-buscar]').type(`${codigoProducto}{enter}`);
});

Cypress.Commands.add('ingresarUnidades', (unidades: number) => {
	cy.get(`[data-cy=cantidad-producto-unidades]`).type(`${unidades}{enter}`);
});

Cypress.Commands.add('ingresarSubUnidades', (subUnidades: number) => {
	cy.get(`[data-cy=cantidad-producto-subUnidades]`).type(
		`${subUnidades}{enter}`
	);
});

Cypress.Commands.add('navegarPageInicio', (fechaActual: string) => {
	cy.visit(`http://localhost:3000/?fecha=${fechaActual}`);
});

Cypress.Commands.add('esperarDatosServidor', () => {
	cy.esperarDatos();
	cy.esperarConfiguracion();
});

Cypress.Commands.add('esperarDatos', () => {
	cy.request('/femsa/tomapedidos');
});

Cypress.Commands.add('esperarConfiguracion', () => {
	cy.request('/femsa/configuracion');
});

Cypress.Commands.add('oprimirBotonSplash', () => {
	cy.get(`[data-cy=boton-splash]`).click();
});

Cypress.Commands.add('oprimirBotonAtras', () => {
	cy.get('[data-cy=boton-atras]').click();
});

Cypress.Commands.add('oprimirBotonCerrarPedido', () => {
	cy.get('[data-cy=boton-cerrarPedido]').click();
});

Cypress.Commands.add('oprimirBotonVerEnvases', () => {
	cy.get('[data-cy=boton-verEnvases]').click();
});

Cypress.Commands.add('avanzarPasoSiguiente', () => {
	cy.get('[data-cy=boton-inferior-avanzar]').click();
});