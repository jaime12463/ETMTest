import {Entonces, Dado} from '../../pasos';

Dado('que se capturó el siguiente pedido', () => {
	cy.navegarPageInicio('2021-06-09');
	cy.esperarDatosServidor();
	cy.oprimirBotonSplash();
	cy.ingresarCodigoCliente('HS002');
	cy.agregarProducto({
		codigoProducto: 360,
		unidades: 10,
		subUnidades: 7,
	});

	cy.agregarProducto({
		codigoProducto: 365,
		unidades: 15,
		subUnidades: 0,
	});
	cy.ingresarSubUnidades(0);

	cy.agregarProducto({
		codigoProducto: 380,
		unidades: 15,
	});
	cy.ingresarSubUnidades(0);

	cy.agregarProducto({
		codigoProducto: 390,
		unidades: 5,
		subUnidades: 5,
	});

	cy.agregarProducto({
		codigoProducto: 400,
		unidades: 0,
		subUnidades: 9,
	});

	cy.agregarProducto({
		codigoProducto: 10010,
		unidades: 3,
		subUnidades: 0,
	});

});

Entonces('el sistema mostrará', () => {
	cy.get('[data-cy=listado-envases-retornables-0]').should('exist');
	cy.get('[data-cy=listado-envases-retornables-0] > .MuiGrid-container > :nth-child(2) > .MuiBox-root > .MuiTypography-root').contains("30");
	cy.get('[data-cy=listado-envases-retornables-0] > .MuiGrid-container > :nth-child(3) > .MuiBox-root > .MuiTypography-root').contains("1");

    cy.get('[data-cy=listado-envases-retornables-1]').should('exist');
	cy.get('[data-cy=listado-envases-retornables-1] > .MuiGrid-container > :nth-child(2) > .MuiBox-root > .MuiTypography-root').contains("15");
	cy.get('[data-cy=listado-envases-retornables-1] > .MuiGrid-container > :nth-child(3) > .MuiBox-root > .MuiTypography-root').contains("0");

	cy.get('[data-cy=listado-envases-retornables-2]').should('exist');
	cy.get('[data-cy=listado-envases-retornables-2] > .MuiGrid-container > :nth-child(2) > .MuiBox-root > .MuiTypography-root').contains("28");
	cy.get('[data-cy=listado-envases-retornables-2] > .MuiGrid-container > :nth-child(2) > .MuiBox-root > .MuiTypography-root').contains("0");
});