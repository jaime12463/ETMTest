declare global {
	namespace Cypress {
		type TPropsFunctionAgregarProducto = {
			codigoProducto: number;
			unidades: number;
			subUnidades?: number;
		};
		interface Chainable {
			oprimirBotonSplash(): void;
			navegarPageInicio(fechaActual: string): void;
			agregarProducto(
				propsAgregarProducto: TPropsFunctionAgregarProducto
			): void;
			ingresarCodigoCliente(codigoCliente: string): void;
			ingresarCodigoProducto(codigoProducto: number): void;
			ingresarUnidades(unidades: number): void;
			ingresarSubUnidades(subUnidades: number): void;
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
		cy.ingresarCodigoProducto(codigoProducto);
		cy.ingresarUnidades(unidades);
		if (subUnidades) cy.ingresarSubUnidades(subUnidades);
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
	cy.request('/femsa/tomapedidos');
	cy.request('/femsa/configuracion');
});

Cypress.Commands.add('oprimirBotonSplash', () => {
	cy.get(`[data-cy=boton-splash]`).click();
});
